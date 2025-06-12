import { Request, Response } from "express";
import testDbConnection from "../dataTest/connectionTestServer";
import { ClickTag } from "../models/Types"; // Assumindo que o tipo ClickTag está definido em Types.ts
import jwt from "jsonwebtoken"; // Para decodificação de token
import connection from "../data/connection";

/**
 * Função para adicionar tags ao campo 'videos' da tabela ClickTags para um usuário específico.
 * As tags são normalizadas (minúsculas, sem espaços extras) e duplicatas são removidas.
 * @param {Request} req - O objeto de requisição do Express, contendo o token de autenticação
 * no cabeçalho 'Authorization' e um array de 'tags' no corpo da requisição.
 * @param {Response} res - O objeto de resposta do Express.
 * @returns {Promise<void>}
 */
export default async function AlterClickTagsVideoFromUserIdProduction(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Espera o token no cabeçalho Authorization: Bearer <token>
    // As tags a serem adicionadas virão no body como um array de strings
    const { tags: newTags }: { tags: string[] } = req.body;

    // 1. Validação de Token e Dados do Corpo
    if (!token) {
      res.status(401).json({ message: "Token de autenticação é obrigatório." });
      return;
    }
    if (!newTags || !Array.isArray(newTags) || newTags.some(tag => typeof tag !== 'string')) {
      res.status(422).json({ message: "É necessário fornecer um array de tags (strings) para adicionar." });
      return;
    }
    if (newTags.length === 0) {
      res.status(400).json({ message: "O array de tags não pode estar vazio." });
      return;
    }

    let userId: string;
    try {
      // 2. Decodificação do Token para obter o ID do usuário
      const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET as string);
      userId = decodedToken.id;
    } catch (error: any) {
      // Tratamento específico de erros de JWT
      if (error instanceof jwt.TokenExpiredError) {
        res.status(403).json({ message: "Token expirado.", error: error.message });
      } else if (error instanceof jwt.JsonWebTokenError) {
        res.status(403).json({ message: "Token inválido.", error: error.message });
      } else {
        res.status(403).json({ message: "Erro de autenticação.", error: error.message });
      }
      return;
    }

    // 3. Busca o registro ClickTags existente para o usuário
    // Supondo que a tabela se chame 'clicktags'
    const userClickTags: ClickTag | undefined = await connection("clicktags")
      .where({ fk_user_id: userId })
      .first();

    // 4. Verifica se o registro ClickTags existe. Se não, algo está errado (deveria ser criado no registro).
    if (!userClickTags) {
      res.status(404).json({ message: "Registro de ClickTags não encontrado para este usuário. Ele deve ser criado no momento do registro do usuário." });
      return;
    }

    // 5. Normaliza as novas tags e as tags existentes e as combina
    // O Knex.js com o driver do PostgreSQL geralmente retorna colunas JSONB/TEXT[]
    // já como objetos/arrays JavaScript. Se 'userClickTags.videos' for uma string aqui,
    // significa que é TEXT e precisa de parse.
    let existingVideoTags: string[] = [];
    if (userClickTags.videos) {
        if (typeof userClickTags.videos === 'string') {
            try {
                existingVideoTags = JSON.parse(userClickTags.videos);
                if (!Array.isArray(existingVideoTags) || existingVideoTags.some(item => typeof item !== 'string')) {
                    existingVideoTags = []; // Se o parse resultar em algo inesperado, reinicia
                }
            } catch (e) {
                console.warn(`Erro ao fazer parse do campo 'videos' do usuário ${userId}. Inicializando como array vazio.`, e);
                existingVideoTags = [];
            }
        } else if (Array.isArray(userClickTags.videos)) {
            existingVideoTags = userClickTags.videos;
        }
    }

    const normalizedExistingTags = existingVideoTags.map(tag => tag.toLowerCase().trim());
    const normalizedNewTags = newTags.map(tag => tag.toLowerCase().trim());

    // Combina e remove duplicatas usando um Set
    const combinedTagsSet = new Set([...normalizedExistingTags, ...normalizedNewTags]);
    const updatedVideoTags = Array.from(combinedTagsSet); // Converte de volta para array

    // 6. Atualiza o campo 'videos' no banco de dados
    // FIX: Removido JSON.stringify().
    // O Knex.js e o driver do PostgreSQL lidarão com a conversão do array JS para JSONB/TEXT[] nativo.
    const affectedRows = await connection("clicktags")
      .where({ fk_user_id: userId })
      .update({
        videos: updatedVideoTags // Passa o array JavaScript diretamente
      });

    // 7. Verifica se a atualização foi bem-sucedida
    if (affectedRows === 0) {
      res.status(500).json({ message: "Falha ao atualizar as ClickTags do vídeo. O registro do usuário não pôde ser alterado." });
      return;
    }

    // 8. Retorna uma resposta de sucesso
    res.status(200).json({ message: "Tags de vídeo adicionadas às ClickTags do usuário com sucesso!", updatedTags: updatedVideoTags });

  } catch (error: any) {
    // 9. Tratamento de erros gerais do servidor
    console.error("Erro ao alterar ClickTags de vídeo do usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor ao alterar ClickTags de vídeo.", error: error.message });
  }
}

/*
Exemplo de Requisição (no Postman/Insomnia):

PUT http://localhost:PORTA_DA_SUA_API/alter-clicktags-video

Headers:
  Content-Type: application/json
  Authorization: Bearer SEU_TOKEN_JWT_AQUI

Body (raw, JSON):
{
  "tags": ["programação", "react", "frontend"] // Array de strings com as tags a serem adicionadas
}

Exemplo de Resposta de Sucesso:
Status: 200 OK
{
  "message": "Tags de vídeo adicionadas às ClickTags do usuário com sucesso!",
  "updatedTags": ["javascript", "programação", "react", "frontend"] // Tags atuais após a adição
}

Exemplo de Resposta de Erro de Autenticação:
Status: 403 Forbidden
{
  "message": "Token inválido.",
  "error": "jwt malformed"
}

Exemplo de Resposta de Requisição Inválida:
Status: 422 Unprocessable Entity
{
  "message": "É necessário fornecer um array de tags (strings) para adicionar."
}
*/