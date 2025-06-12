import { Request, Response } from "express";
import testDbConnection from "../dataTest/connectionTestServer";
import { User } from "../models/Types"; // Assumindo que o tipo User está definido em Types.ts
import jwt from "jsonwebtoken"; // Para decodificação de token
import connection from "../data/connection";

/**
 * Função para alterar as informações de um usuário (todas, exceto a senha)
 * com base no token de autenticação.
 * @param {Request} req - O objeto de requisição do Express, contendo o token de autenticação
 * no cabeçalho 'Authorization' e as informações do usuário no corpo.
 * @param {Response} res - O objeto de resposta do Express.
 * @returns {Promise<void>}
 */
export default async function AlterUserInfoFromIdProduction(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Espera o token no cabeçalho Authorization: Bearer <token>
    // As informações para alteração virão no body.
    // Usamos Partial<User> para indicar que nem todos os campos da User serão obrigatórios no body.
    const updates: Partial<User> = req.body;

    // 1. Validação do Token
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

    // 3. Remove a senha e o ID do objeto de atualização para evitar alteração indevida
    if ('senha' in updates) {
      delete updates.senha; // Garante que a senha nunca seja alterada por aqui
    }
    if ('id' in updates) {
      delete updates.id; // Garante que o ID nunca seja alterado
    }

    // 4. Verifica se há campos válidos para atualizar
    if (Object.keys(updates).length === 0) {
      res.status(400).json({ message: "Nenhum campo válido para atualização fornecido no corpo da requisição." });
      return;
    }

    // 5. Realiza a alteração no banco de dados
    // Supondo que a tabela de usuários se chame 'usuario'
    const affectedRows = await connection("users")
      .where({ id: userId })
      .update(updates);

    // 6. Verifica se o usuário foi encontrado e atualizado
    if (affectedRows === 0) {
      // Isso pode acontecer se o token for válido, mas o usuário não existe mais no DB
      res.status(404).json({ message: "Usuário não encontrado para atualização." });
      return;
    }

    // 7. Retorna uma resposta de sucesso
    res.status(200).json({ message: "Informações do usuário atualizadas com sucesso!" });

  } catch (error: any) {
    // 8. Tratamento de erros gerais do servidor
    console.error("Erro ao alterar informações do usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor ao alterar informações do usuário.", error: error.message });
  }
}

/*
Exemplo de Requisição (no Postman/Insomnia):

PUT http://localhost:PORTA_DA_SUA_API/alter-user-info

Headers:
  Content-Type: application/json
  Authorization: Bearer SEU_TOKEN_JWT_AQUI

Body (raw, JSON):
{
  "nome": "João Novo",
  "email": "joao.novo@example.com",
  "cidade": "Olinda",
  "numero_telefone": "81999995555"
  // Outros campos que deseja alterar
}

Exemplo de Resposta de Sucesso:
Status: 200 OK
{
  "message": "Informações do usuário atualizadas com sucesso!"
}

Exemplo de Resposta de Nenhuma Alteração (se o usuário não existe):
Status: 404 Not Found
{
  "message": "Usuário não encontrado para atualização."
}

Exemplo de Resposta de Erro de Autenticação:
Status: 403 Forbidden
{
  "message": "Token inválido.",
  "error": "jwt malformed"
}

Exemplo de Resposta de Requisição Inválida (sem dados para alterar):
Status: 400 Bad Request
{
  "message": "Nenhum campo válido para atualização fornecido no corpo da requisição."
}
*/