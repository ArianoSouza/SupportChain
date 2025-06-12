import { Request, Response } from "express";
import testDbConnection from "../dataTest/connectionTestServer";
import { UserAnswer } from "../models/Types"; // Assumindo que o tipo UserAnswer está definido em Types.ts
import { GeradorId } from '../services/geradorId'; // Importar seu gerador de ID
import jwt from "jsonwebtoken"; // Para decodificação de token

/**
 * Função para registrar as respostas de um usuário a um questionário.
 * O campo 'answers' é tratado como um array de strings.
 * Verifica se o usuário já respondeu a este questionário para evitar duplicidade.
 * @param {Request} req - O objeto de requisição do Express, contendo o token de autenticação
 * no cabeçalho 'Authorization' e 'fk_questionarie_id' e 'answers' (como array de strings) no corpo.
 * @param {Response} res - O objeto de resposta do Express.
 * @returns {Promise<void>}
 */
export default async function PostNewUserAnswersOnTestDB(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Espera o token no cabeçalho Authorization: Bearer <token>
    // Ajustado para 'answers' ser um array de strings no body
    const { fk_questionarie_id, answers }: { fk_questionarie_id: string; answers: string[] } = req.body;

    // 1. Validação de Token e Dados do Corpo
    if (!token) {
      res.status(401).json({ message: "Token de autenticação é obrigatório." });
      return;
    }
    // Ajustado a validação para verificar se 'answers' é um array de strings
    if (!fk_questionarie_id || !Array.isArray(answers) || answers.some(a => typeof a !== 'string')) {
      res.status(422).json({ message: "O ID do questionário e as respostas (array de strings) são obrigatórios." });
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

    // 3. Verifica se o usuário já respondeu a este questionário
    // Supondo que a tabela de respostas do usuário se chame 'useranswers'
    const existingAnswer: UserAnswer | undefined = await testDbConnection("useranswers")
      .where({
        fk_user_id: userId,
        fk_questionarie_id: fk_questionarie_id
      })
      .first();

    if (existingAnswer) {
      // Se o usuário já respondeu, retorna um status 409 Conflict.
      res.status(409).json({ message: "Este usuário já enviou respostas para este questionário." });
      return;
    }

    // 4. Gera um novo ID para a resposta
    const answerId: string = new GeradorId().GeradorId();

    // 5. Prepara o objeto da nova resposta
    // FIX: Removido JSON.stringify() para 'answers'.
    // O Knex.js e o driver do PostgreSQL lidarão com a conversão de arrays JS para JSONB/TEXT[] nativo.
    const newAnswer: UserAnswer = {
      id: answerId,
      fk_user_id: userId,
      fk_questionarie_id: fk_questionarie_id,
      answers: answers // Passa o array JavaScript diretamente
    };

    // 6. Insere a nova resposta na tabela 'user_answers'
    await testDbConnection("useranswers").insert(newAnswer);

    // 7. Retorna uma resposta de sucesso
    res.status(201).json({ message: "Respostas do usuário registradas com sucesso!", answerId: answerId });

  } catch (error: any) {
    // 8. Tratamento de erros gerais do servidor
    console.error("Erro ao registrar respostas do usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor ao registrar respostas.", error: error.message });
  }
}

/*
Exemplo de Requisição (no Postman/Insomnia):

POST http://localhost:PORTA_DA_SUA_API/post-user-answers

Headers:
  Content-Type: application/json
  Authorization: Bearer SEU_TOKEN_JWT_AQUI

Body (raw, JSON):
{
  "fk_questionarie_id": "id_do_questionario_aqui",
  "answers": ["resposta_a_pergunta_1", "resposta_a_pergunta_2", "resposta_a_pergunta_3"] // AGORA É UM ARRAY DE STRINGS
}

Exemplo de Resposta de Sucesso:
Status: 201 Created
{
  "message": "Respostas do usuário registradas com sucesso!",
  "answerId": "resposta_xyz123"
}

Exemplo de Resposta de Conflito (já respondeu):
Status: 409 Conflict
{
  "message": "Este usuário já enviou respostas para este questionário."
}

Exemplo de Resposta de Erro de Validação de Input:
Status: 422 Unprocessable Entity
{
  "message": "O ID do questionário e as respostas (array de strings) são obrigatórios."
}
*/