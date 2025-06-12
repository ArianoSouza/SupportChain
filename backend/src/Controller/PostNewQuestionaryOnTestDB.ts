import { Request, Response } from "express";
import testDbConnection from "../dataTest/connectionTestServer";
import { Questionary } from "../models/Types"; // Assumindo que o tipo Questionary está definido em Types.ts
import { GeradorId } from '../services/geradorId'; // Importar seu gerador de ID
import connection from "../data/connection";

/**
 * Função para adicionar um novo questionário à tabela 'questionaries'.
 * Os campos 'questions' e 'options' (arrays de strings) são inseridos diretamente.
 * @param {Request} req - O objeto de requisição do Express, contendo 'fk_id_activitie', 'questions', 'options' no corpo.
 * @param {Response} res - O objeto de resposta do Express.
 * @returns {Promise<void>}
 */
export default async function PostNewQuestionaryProduction(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { fk_id_activitie, questions, options }: { fk_id_activitie: string; questions: string[]; options: string[]; } = req.body;

    // 1. Validação dos campos obrigatórios
    if (
      !fk_id_activitie ||
      !questions || !Array.isArray(questions) || questions.some(q => typeof q !== 'string') ||
      !options || !Array.isArray(options) || options.some(o => !Array.isArray(o) && typeof o !== 'string') // Opções podem ser array de array ou array de string
    ) {
      res.status(422).json({ message: "Missing required fields: fk_id_activitie, questions (array of strings), or options (array of arrays/strings)." });
      return;
    }

    // 2. Gera um ID único para o novo questionário
    const questCountResult = await connection('questionaries').count('id as count').first();
    const questCount = questCountResult ? parseInt(questCountResult.count as string, 10) : 0;
    const newQuestId = `quest_${questCount + 1}`;

    // 3. Prepara o objeto do novo questionário para inserção
    // O Knex.js e o driver do PostgreSQL lidarão com a conversão de arrays JS para JSONB/TEXT[] nativo.
    const newQuestionary: Questionary = {
      id: newQuestId,
      fk_id_activitie: fk_id_activitie,
      questions: questions, // Passa o array JavaScript diretamente
      options: options      // Passa o array JavaScript diretamente
    };

    // 4. Insere o novo questionário na tabela 'questionaries'
    await connection("questionaries").insert(newQuestionary);

    // 5. Retorna uma resposta de sucesso
    res.status(201).json({ message: "Questionário adicionado com sucesso!", questionaryId: newQuestId });

  } catch (error: any) {
    // 6. Tratamento de erros gerais do servidor
    console.error("Erro ao adicionar novo questionário:", error);
    res.status(500).json({ message: "Erro interno do servidor ao adicionar questionário.", error: error.message });
  }
}

/*
Exemplo de Requisição (no Postman/Insomnia):

POST http://localhost:PORTA_DA_SUA_API/post-new-questionary

Headers:
  Content-Type: application/json

Body (raw, JSON):
{
  "fk_id_activitie": "activity_xyz789",
  "questions": ["Qual é a capital do Brasil?", "Qual a cor do céu?"],
  "options": [
    ["Rio de Janeiro", "Brasília", "São Paulo"],
    ["Azul", "Verde", "Vermelho"]
  ]
}
OU (se 'options' for um array de strings simples, dependendo da sua estrutura exata)
{
  "fk_id_activitie": "activity_xyz789",
  "questions": ["Qual é a capital do Brasil?"],
  "options": ["Rio de Janeiro", "Brasília", "São Paulo"] // Se for array de strings simples
}

Exemplo de Resposta de Sucesso:
Status: 201 Created
{
  "message": "Questionário adicionado com sucesso!",
  "questionaryId": "questionary_abc123"
}

Exemplo de Resposta de Erro de Validação:
Status: 422 Unprocessable Entity
{
  "message": "Missing required fields: fk_id_activitie, questions (array of strings), or options (array of arrays/strings)."
}
*/