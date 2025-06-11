import { Request, Response } from "express";
import testDbConnection from "../dataTest/connectionTestServer";
import { Questionary, UserAnswer } from "../models/Types"; // Assumindo que os tipos estão definidos em Types.ts
import jwt from "jsonwebtoken"; // Para decodificação de token

/**
 * Função para buscar o questionário de uma atividade e verificar se o usuário já respondeu.
 * @param {Request} req - O objeto de requisição do Express, contendo o ID da atividade nos parâmetros
 * e o token de autenticação no cabeçalho 'Authorization'.
 * @param {Response} res - O objeto de resposta do Express.
 * @returns {Promise<void>}
 */
export default async function GetQuestionsFromActivitieIdFromTestDB(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const activitieId: string = req.params.id; // Assume que o ID da atividade virá como ':id' na rota
    const token = req.headers.authorization?.split(" ")[1]; // Preferencialmente no cabeçalho Authorization: Bearer <token>

    // 1. Validação de parâmetros e token
    if (!activitieId) {
      res.status(400).json({ message: "O ID da atividade é obrigatório." });
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

    // 3. Busca o questionário relacionado à atividade
    // Supondo que a tabela de questionários se chame 'questionaries'
    const questionary: Questionary | undefined = await testDbConnection("questionaries")
      .where({ fk_id_activitie: activitieId })
      .first(); // Assumindo que uma atividade tem 0 ou 1 questionário

    // 4. Verifica se o questionário foi encontrado
    if (!questionary) {
      res.status(404).json({ message: `Nenhum questionário encontrado para a atividade com ID: ${activitieId}.` });
      return;
    }

    // 5. Tratamento de campos JSON do questionário
    // Se 'questions' e 'options' são armazenados como strings JSON no DB,
    // você precisará fazer o parse aqui. Caso contrário, remova esta etapa.
    const parsedQuestionary: Questionary = {
      ...questionary,
      questions: typeof questionary.questions === 'string' ? JSON.parse(questionary.questions) : questionary.questions,
      options: typeof questionary.options === 'string' ? JSON.parse(questionary.options) : questionary.options,
    };

    // 6. Busca na tabela UserAnswer se o usuário já respondeu a este questionário
    // Supondo que a tabela se chame 'user_answers'
    const userAnswer: UserAnswer | undefined = await testDbConnection("user_answers")
      .where({
        fk_user_id: userId,
        fk_questionarie_id: parsedQuestionary.id
      })
      .first();

    // 7. Determina se o usuário já respondeu
    const hasAnswered: boolean = !!userAnswer; // Converte para boolean

    // 8. Retorna o questionário e o status de resposta do usuário
    res.status(200).json({
      message: `Questionário para a atividade ${activitieId} recuperado com sucesso!`,
      questionary: parsedQuestionary,
      hasAnswered: hasAnswered
    });

  } catch (error: any) {
    // 9. Tratamento de erros gerais do servidor
    console.error("Erro ao buscar questionário por ID de atividade:", error);
    res.status(500).json({ message: "Erro interno do servidor ao obter questionário.", error: error.message });
  }
}

/*
Exemplo de Requisição (no Postman/Insomnia):

GET http://localhost:PORTA_DA_SUA_API/get-questions-by-activitie/ID_DA_ATIVIDADE_AQUI

Headers:
  Authorization: Bearer SEU_TOKEN_JWT_AQUI

Exemplo:
GET http://localhost:3000/get-questions-by-activitie/activity_quiz_js
Headers: Authorization: Bearer eyJhbGci...

Exemplo de Resposta de Sucesso (Usuário NÃO respondeu):
Status: 200 OK
{
  "message": "Questionário para a atividade activity_quiz_js recuperado com sucesso!",
  "questionary": {
    "id": "quiz_1",
    "fk_id_activitie": "activity_quiz_js",
    "questions": ["Qual é a capital do Brasil?", "Quem descobriu o Brasil?"],
    "options": [
      ["Rio", "Brasília", "São Paulo"],
      ["Pedro Álvares Cabral", "Dom Pedro I", "Cristóvão Colombo"]
    ]
  },
  "hasAnswered": false
}

Exemplo de Resposta de Sucesso (Usuário JÁ respondeu):
Status: 200 OK
{
  "message": "Questionário para a atividade activity_quiz_js recuperado com sucesso!",
  "questionary": {
    "id": "quiz_1",
    "fk_id_activitie": "activity_quiz_js",
    "questions": ["Qual é a capital do Brasil?", "Quem descobriu o Brasil?"],
    "options": [
      ["Rio", "Brasília", "São Paulo"],
      ["Pedro Álvares Cabral", "Dom Pedro I", "Cristóvão Colombo"]
    ]
  },
  "hasAnswered": true
}

Exemplo de Resposta sem Questionário:
Status: 404 Not Found
{
  "message": "Nenhum questionário encontrado para a atividade com ID: activity_sem_quiz."
}

Exemplo de Resposta de Erro de Autenticação:
Status: 403 Forbidden
{
  "message": "Token inválido.",
  "error": "jwt malformed"
}
*/