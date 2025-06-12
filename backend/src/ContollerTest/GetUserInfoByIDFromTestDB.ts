import { Request, Response } from "express";
import testDbConnection from "../dataTest/connectionTestServer";
import { User } from "../models/Types"; // Assumindo que o tipo User está definido em Types.ts
import jwt from "jsonwebtoken"; // Para decodificação de token

/**
 * Função para buscar todas as informações de um usuário (exceto a senha)
 * a partir de um token de autenticação.
 * @param {Request} req - O objeto de requisição do Express, contendo o token de autenticação
 * no cabeçalho 'Authorization'.
 * @param {Response} res - O objeto de resposta do Express.
 * @returns {Promise<void>}
 */
export default async function GetUserInfoFromIdFromTestDB(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Espera o token no cabeçalho Authorization: Bearer <token>

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

    // 3. Busca as informações do usuário, excluindo a senha
    // Supondo que a tabela de usuários se chame 'usuario'
    const user: Omit<User, 'senha'> | undefined = await testDbConnection("users")
      .where({ id: userId })
      .select(
        "id",
        "nome",
        "sobrenome",
        "email",
        "sexo",
        "estado_civil",
        "data_nascimento",
        "numero_telefone",
        "estado",
        "cidade",
        "bairro",
        "foto",
      ) // Exclui explicitamente o campo 'senha'
      .first();

    // 4. Verifica se o usuário foi encontrado
    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado." });
      return;
    }

    // 5. Retorna as informações do usuário
    res.status(200).json({
      message: "Informações do usuário recuperadas com sucesso!",
      user: user
    });

  } catch (error: any) {
    // 6. Tratamento de erros gerais do servidor
    console.error("Erro ao obter informações do usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor ao obter informações do usuário.", error: error.message });
  }
}

/*
Exemplo de Requisição (no Postman/Insomnia):

GET http://localhost:3000/get-user-info

Headers:
  Authorization: Bearer SEU_TOKEN_JWT_AQUI

Exemplo de Resposta de Sucesso:
Status: 200 OK
{
  "message": "Informações do usuário recuperadas com sucesso!",
  "user": {
    "id": "user_123",
    "nome": "João",
    "sobrenome": "Silva",
    "email": "joao.silva@example.com",
    "sexo": "Masculino",
    "estado_civil": "Solteiro",
    "data_nascimento": "1990-05-15",
    "numero_telefone": "81999991234",
    "estado": "Pernambuco",
    "cidade": "Recife",
    "bairro": "Boa Viagem",
    "foto": "url_da_foto.jpg",
  }
}

Exemplo de Resposta de Usuário Não Encontrado:
Status: 404 Not Found
{
  "message": "Usuário não encontrado."
}

Exemplo de Resposta de Erro de Autenticação:
Status: 403 Forbidden
{
  "message": "Token inválido.",
  "error": "jwt malformed"
}
*/