import { Request, Response } from "express";
import testDbConnection from "../dataTest/connectionTestServer";
import { Activity } from "../models/Types"; // Assumindo que o tipo Activity está definido em Types.ts
import connection from "../data/connection";

/**
 * Função para buscar todas as atividades relacionadas a uma categoria (tag) específica.
 * @param {Request} req - O objeto de requisição do Express, contendo a categoria (tag) nos parâmetros.
 * @param {Response} res - O objeto de resposta do Express.
 * @returns {Promise<void>}
 */
export default async function GetActivitiesFromActivitiesTagProduction(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const categoryTag: string = req.params.tag; // Assume que a tag virá como ':tag' na rota

    // 1. Validação inicial: verifica se a categoria (tag) foi fornecida
    if (!categoryTag) {
      res.status(400).json({ message: "A categoria (tag) da atividade é obrigatória." });
      return;
    }

    // Normaliza a tag de entrada para minúsculas e remove espaços, para consistência na busca
    const normalizedCategoryTag = categoryTag.toLowerCase().trim();

    // 2. Busca as atividades no banco de dados que contêm a tag especificada.
    // FIX FINAL: Usando o operador 'ANY' para colunas PostgreSQL TEXT[].
    // Isso verifica se a normalizedCategoryTag é IGUAL a QUALQUER elemento no array 'tags'.
    const activities: Activity[] = await connection("activities")
      .whereRaw('? = ANY(tags)', [normalizedCategoryTag]) // Perfeito para TEXT[]
      .select(
        "id",
        "title",
        "description",
        "icon",
        "tags"
      );

    // 3. Verifica se alguma atividade foi encontrada para a categoria
    if (activities.length === 0) {
      res.status(404).json({ message: `Nenhuma atividade encontrada para a categoria: "${categoryTag}".` });
      return;
    }

    // 4. Tratamento de campos de arrays:
    // Não é necessário JSON.parse aqui, pois o banco de dados já retorna o array TEXT[] como um array JavaScript.
    // No entanto, para garantir que as tags estejam em minúsculas (se você não forçar isso no DB)
    // podemos mapeá-las na resposta.
    const finalActivities: Activity[] = activities.map(activity => ({
      ...activity,
      // O Knex.js com o driver PostgreSQL já deve retornar `activity.tags` como `string[]`
      // mas se quiser garantir normalização na saída:
      tags: Array.isArray(activity.tags) ? activity.tags.map(tag => tag.toLowerCase().trim()) : [],
    }));

    // 5. Retorna as atividades encontradas
    res.status(200).json({
      message: `Atividades para a categoria "${categoryTag}" recuperadas com sucesso!`,
      activities: finalActivities
    });

  } catch (error: any) {
    // 6. Tratamento de erros de servidor
    console.error("Erro ao buscar atividades por categoria:", error);
    res.status(500).json({ message: "Erro interno do servidor ao obter atividades.", error: error.message });
  }
}

/*
Exemplo de Requisição (no Postman/Insomnia):

GET http://localhost:PORTA_DA_SUA_API/get-activities-by-tag/DESENVOLVIMENTO_WEB

Exemplo:
GET http://localhost:3000/get-activities-by-tag/javascript

Não são necessários headers de autenticação ou corpo, a menos que você adicione uma lógica para isso.

Exemplo de Resposta de Sucesso:
Status: 200 OK
{
  "message": "Atividades para a categoria \"javascript\" recuperadas com sucesso!",
  "activities": [
    {
      "id": "activity_1",
      "title": "Desafio de Código JS",
      "description": "Resolva problemas complexos usando JavaScript.",
      "icon": "js-challenge.png",
      "tags": ["javascript", "coding", "logica"]
    },
    {
      "id": "activity_2",
      "title": "Projeto Front-end com React",
      "description": "Desenvolva uma interface de usuário interativa.",
      "icon": "react-project.png",
      "tags": ["react", "javascript", "frontend"]
    }
  ]
}

Exemplo de Resposta sem Atividades:
Status: 404 Not Found
{
  "message": "Nenhuma atividade encontrada para a categoria: \"inteligencia_artificial\"."
}

Exemplo de Resposta de Erro Interno:
Status: 500 Internal Server Error
{
  "message": "Erro interno do servidor ao obter atividades.",
  "error": "..."
}
*/