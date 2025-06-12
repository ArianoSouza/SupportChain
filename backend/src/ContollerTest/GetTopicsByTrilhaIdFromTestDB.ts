import { Request, Response } from "express";
import testDbConnection from "../dataTest/connectionTestServer";
import { Topic } from "../models/Types"; // Assuming Topic type is defined in Types.ts

/**
 * Função para buscar todos os tópicos relacionados a um ID de trilha específico.
 * Os tópicos são retornados ordenados pela sua 'order_position'.
 * @param {Request} req - O objeto de requisição do Express, contendo o ID da trilha nos parâmetros.
 * @param {Response} res - O objeto de resposta do Express.
 * @returns {Promise<void>}
 */
export default async function GetTopicsFromTrilhaIdFromTestDB(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const trilhaId: string = req.params.id; // Assume que o ID da trilha virá como ':id' na rota

    // 1. Validação inicial: verifica se o ID da trilha foi fornecido
    if (!trilhaId) {
      res.status(400).json({ message: "O ID da trilha é obrigatório." });
      return;
    }

    // 2. Busca os tópicos no banco de dados relacionados ao fk_id_trilha
    // Ordena os tópicos pela 'order_position' para garantir uma sequência lógica
    const topics: Topic[] = await testDbConnection("topics") // Supondo que a tabela se chame 'topics'
      .where({ fk_id_trilha: trilhaId })
      .orderBy('order_position', 'asc') // Ordena por order_position crescente
      .select(
        "id",
        "fk_id_trilha",
        "order_position",
        "description",
        "title"
      );

    // 3. Verifica se algum tópico foi encontrado para a trilha
    if (topics.length === 0) {
      res.status(404).json({ message: `Nenhum tópico encontrado para a trilha com ID: ${trilhaId}.` });
      return;
    }

    // 4. Retorna os tópicos encontrados
    res.status(200).json({
      message: `Tópicos para a trilha ${trilhaId} recuperados com sucesso!`,
      topics: topics
    });

  } catch (error: any) {
    // 5. Tratamento de erros de servidor
    console.error("Erro ao buscar tópicos por ID de trilha:", error);
    res.status(500).json({ message: "Erro interno do servidor ao obter tópicos.", error: error.message });
  }
}

/*
Exemplo de Requisição (no Postman/Insomnia):

GET http://localhost:PORTA_DA_SUA_API/get-topics-by-trilha/ID_DA_TRILHA_AQUI

Exemplo:
GET http://localhost:3000/get-topics-by-trilha/trilha_webdev

Não são necessários headers de autenticação ou corpo, a menos que você adicione uma lógica para isso.

Exemplo de Resposta de Sucesso:
Status: 200 OK
{
  "message": "Tópicos para a trilha trilha_webdev recuperados com sucesso!",
  "topics": [
    {
      "id": "topic_1",
      "fk_id_trilha": "trilha_webdev",
      "order_position": 1,
      "description": "Introdução ao HTML5.",
      "title": "HTML Básico"
    },
    {
      "id": "topic_2",
      "fk_id_trilha": "trilha_webdev",
      "order_position": 2,
      "description": "Estilizando com CSS3.",
      "title": "CSS Essencial"
    }
  ]
}

Exemplo de Resposta sem Tópicos:
Status: 404 Not Found
{
  "message": "Nenhum tópico encontrado para a trilha com ID: trilha_nao_existe."
}

Exemplo de Resposta de Erro Interno:
Status: 500 Internal Server Error
{
  "message": "Erro interno do servidor ao obter tópicos.",
  "error": "..."
}
*/