import { Request, Response } from "express";
import testDbConnection from "../dataTest/connectionTestServer";
import { content, Content } from "../models/Types"; // Assumindo que o tipo Content está definido em Types.ts
import { GeradorId } from '../services/geradorId'; // Importar seu gerador de ID

/**
 * Função para adicionar um novo conteúdo à tabela 'contents'.
 * Os campos 'titles' e 'paragraphs' (arrays de strings) são inseridos diretamente.
 * @param {Request} req - O objeto de requisição do Express, contendo 'fk_topic_id', 'titles', 'paragraphs' no corpo.
 * @param {Response} res - O objeto de resposta do Express.
 * @returns {Promise<void>}
 */
export default async function PostNewContent(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { fk_id_topic, titles, paragraphs }: { fk_id_topic: string; titles: string[]; paragraphs: string[] } = req.body;

    // 1. Validação dos campos obrigatórios
    if (
      !fk_id_topic ||
      !titles || !Array.isArray(titles) || titles.some(t => typeof t !== 'string') ||
      !paragraphs || !Array.isArray(paragraphs) || paragraphs.some(p => typeof p !== 'string')
    ) {
      res.status(422).json({ message: "Missing required fields: fk_topic_id, titles (array of strings), or paragraphs (array of strings)." });
      return;
    }

    // 2. Gera um ID único para o novo conteúdo
    const contentId: string = new GeradorId().GeradorId();

    // 3. Prepara o objeto do novo conteúdo para inserção
    // FIX: Removido JSON.stringify() para 'titles' e 'paragraphs'.
    // O Knex.js e o driver do PostgreSQL lidarão com a conversão de arrays JS para JSONB/TEXT[] nativo.
    const newContent: content = {
      id: contentId,
      fk_id_topic: fk_id_topic,
      titles: titles,      // Passa o array JavaScript diretamente
      paragraphs: paragraphs // Passa o array JavaScript diretamente
    };

    // 4. Insere o novo conteúdo na tabela 'contents'
    await testDbConnection("contents").insert(newContent);

    // 5. Retorna uma resposta de sucesso
    res.status(201).json({ message: "Conteúdo adicionado com sucesso!", contentId: contentId });

  } catch (error: any) {
    // 6. Tratamento de erros gerais do servidor
    console.error("Erro ao adicionar novo conteúdo:", error);
    res.status(500).json({ message: "Erro interno do servidor ao adicionar conteúdo.", error: error.message });
  }
}

/*
Exemplo de Requisição (no Postman/Insomnia):

POST http://localhost:PORTA_DA_SUA_API/post-new-content

Headers:
  Content-Type: application/json

Body (raw, JSON):
{
  "fk_topic_id": "topic_abc123",
  "titles": ["Introdução", "Seção 1.1", "Conclusão"],
  "paragraphs": [
    "Este é o primeiro parágrafo de introdução...",
    "Detalhes da seção 1.1 são apresentados aqui...",
    "Em resumo, o conteúdo abordou os seguintes pontos..."
  ]
}

Exemplo de Resposta de Sucesso:
Status: 201 Created
{
  "message": "Conteúdo adicionado com sucesso!",
  "contentId": "content_xyz789"
}

Exemplo de Resposta de Erro de Validação:
Status: 422 Unprocessable Entity
{
  "message": "Missing required fields: fk_topic_id, titles (array of strings), or paragraphs (array of strings)."
}
*/