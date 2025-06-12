import { Request, Response } from "express";
import testDbConnection from "../dataTest/connectionTestServer";
import { Video } from "../models/Types"; // Importa o tipo Video
import jwt from "jsonwebtoken"; // Para decodificação de token

/**
 * Função para adicionar o ID do usuário ao campo 'likes' de um vídeo.
 * Impede que o mesmo usuário curta o vídeo múltiplas vezes.
 * @param {Request} req - O objeto de requisição do Express, contendo o token de autenticação
 * @param {Response} res - O objeto de resposta do Express.
 * @returns {Promise<void>}
 */
export default async function AddLikeOnVideoOnTestBD(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const videoId: string = req.params.id; // Assume que o ID do vídeo virá como ':id' na rota
    const token = req.headers.authorization?.split(" ")[1]; // Espera o token no cabeçalho Authorization: Bearer <token>

    // 1. Validação de Parâmetros e Token
    if (!videoId) {
      res.status(400).json({ message: "O ID do vídeo é obrigatório." });
      return;
    }
    if (!token) {
      res.status(401).json({ message: "Token de autenticação é obrigatório." });
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

    // 3. Busca o vídeo no banco de dados
    // Supondo que a tabela de vídeos se chame 'videos'
    const video: Video | undefined = await testDbConnection("videos")
      .where({ id: videoId })
      .first();

    // 4. Verifica se o vídeo foi encontrado
    if (!video) {
      res.status(404).json({ message: "Vídeo não encontrado." });
      return;
    }

    // 5. Prepara o array de likes:
    // O Knex.js com o driver do PostgreSQL geralmente retorna colunas JSONB/TEXT[]
    // já como objetos/arrays JavaScript. Se 'video.likes' for uma string aqui,
    // significa que é TEXT e precisa de parse.
    let currentLikes: string[] = [];
    if (video.likes) {
        if (typeof video.likes === 'string') {
            // Tenta fazer o parse apenas se for uma string (caso a coluna seja TEXT que guarda JSON)
            try {
                currentLikes = JSON.parse(video.likes);
                if (!Array.isArray(currentLikes) || currentLikes.some(item => typeof item !== 'string')) {
                    currentLikes = []; // Se o parse resultar em algo inesperado, reinicia
                }
            } catch (e) {
                console.warn(`Erro ao fazer parse do campo 'likes' do vídeo ${videoId}. Inicializando como array vazio.`, e);
                currentLikes = [];
            }
        } else if (Array.isArray(video.likes)) {
            // Se já veio como array (tipo JSONB ou TEXT[] nativo do DB)
            currentLikes = video.likes;
        }
    }


    // 6. Verifica se o usuário já curtiu o vídeo
    if (currentLikes.includes(userId)) {
      res.status(200).json({ message: "Vídeo já foi curtido por este usuário." });
      return;
    }

    // 7. Adiciona o ID do usuário ao array de likes
    currentLikes.push(userId);

    // 8. Atualiza o campo 'likes' no banco de dados:
    // FIX: Removido JSON.stringify().
    // O Knex.js e o driver do PostgreSQL lidarão com a conversão do array JS para JSONB/TEXT[] nativo.
    const affectedRows = await testDbConnection("videos")
      .where({ id: videoId })
      .update({
        likes: currentLikes // Passa o array JavaScript diretamente
      });

    // 9. Verifica se a atualização foi bem-sucedida
    if (affectedRows === 0) {
      res.status(500).json({ message: "Falha ao adicionar like ao vídeo. O vídeo não pôde ser atualizado." });
      return;
    }

    // 10. Retorna uma resposta de sucesso
    res.status(200).json({ message: "Like adicionado ao vídeo com sucesso!", videoId: videoId, totalLikes: currentLikes.length });

  } catch (error: any) {
    // 11. Tratamento de erros gerais do servidor
    console.error("Erro ao adicionar like ao vídeo:", error);
    res.status(500).json({ message: "Erro interno do servidor ao adicionar like ao vídeo.", error: error.message });
  }
}

/*
Exemplo de Requisição (no Postman/Insomnia):

POST http://localhost:PORTA_DA_SUA_API/like-video/ID_DO_VIDEO_AQUI

Headers:
  Authorization: Bearer SEU_TOKEN_JWT_AQUI

Exemplo:
POST http://localhost:3000/like-video/video_abc123
Headers: Authorization: Bearer eyJhbGci...

Exemplo de Resposta de Sucesso (Primeira Curtida):
Status: 200 OK
{
  "message": "Like adicionado ao vídeo com sucesso!",
  "videoId": "video_abc123",
  "totalLikes": 1
}

Exemplo de Resposta de Sucesso (Já Curtido):
Status: 200 OK
{
  "message": "Vídeo já foi curtido por este usuário."
}

Exemplo de Resposta de Vídeo Não Encontrado:
Status: 404 Not Found
{
  "message": "Vídeo não encontrado."
}

Exemplo de Resposta de Erro de Autenticação:
Status: 403 Forbidden
{
  "message": "Token inválido.",
  "error": "jwt malformed"
}
*/