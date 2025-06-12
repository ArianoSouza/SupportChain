import { Request, Response } from "express";
import testDbConnection from "../dataTest/connectionTestServer";
import { Content } from "../models/Types"; // Assumindo que o tipo Content está definido em Types.ts

/**
 * Função para buscar o conteúdo relacionado a um ID de tópico específico.
 * @param {Request} req - O objeto de requisição do Express, contendo o ID do tópico nos parâmetros.
 * @param {Response} res - O objeto de resposta do Express.
 * @returns {Promise<void>}
 */
export default async function GetContentFromTopicsIdFromTestDB(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const topicId: string = req.params.id; // Assume que o ID do tópico virá como ':id' na rota

    // 1. Validação inicial: verifica se o ID do tópico foi fornecido
    if (!topicId) {
      res.status(400).json({ message: "O ID do tópico é obrigatório." });
      return;
    }

    // 2. Busca o conteúdo no banco de dados relacionado ao fk_id_topic
    // Supondo que a tabela se chame 'contents'
    const content: Content | undefined = await testDbConnection("contents")
      .where({ fk_id_topic: topicId })
      .first(); // Usamos .first() pois geralmente um tópico tem um único bloco de conteúdo principal

    // 3. Verifica se o conteúdo foi encontrado para o tópico
    if (!content) {
      res.status(404).json({ message: `Nenhum conteúdo encontrado para o tópico com ID: ${topicId}.` });
      return;
    }

    // 4. Tratamento de campos JSON (se aplicável)
    // Se 'titles', 'paragraphs' e 'media' são armazenados como strings JSON no DB,
    // você precisará fazer o parse aqui. Caso contrário, remova esta etapa.
    const parsedContent: Content = {
      ...content,
      titles: typeof content.titles === 'string' ? JSON.parse(content.titles) : content.titles,
      paragraphs: typeof content.paragraphs === 'string' ? JSON.parse(content.paragraphs) : content.paragraphs,
    };

    // 5. Retorna o conteúdo encontrado
    res.status(200).json({
      message: `Conteúdo para o tópico ${topicId} recuperado com sucesso!`,
      content: parsedContent
    });

  } catch (error: any) {
    // 6. Tratamento de erros de servidor
    console.error("Erro ao buscar conteúdo por ID de tópico:", error);
    res.status(500).json({ message: "Erro interno do servidor ao obter conteúdo.", error: error.message });
  }
}

/*
Exemplo de Requisição (no Postman/Insomnia):

GET http://localhost:PORTA_DA_SUA_API/get-content-by-topic/ID_DO_TOPICO_AQUI

Exemplo:
GET http://localhost:3000/get-content-by-topic/topic_html_basic

Não são necessários headers de autenticação ou corpo, a menos que você adicione uma lógica para isso.

Exemplo de Resposta de Sucesso:
Status: 200 OK
{
  "message": "Conteúdo para o tópico topic_html_basic recuperado com sucesso!",
  "content": {
    "id": "content_1",
    "fk_id_topic": "topic_html_basic",
    "titles": ["O que é HTML?", "Estrutura Básica"],
    "paragraphs": ["HTML (HyperText Markup Language) é a linguagem padrão...", "Todo documento HTML começa com <!DOCTYPE html>..."],
  }
}

Exemplo de Resposta sem Conteúdo:
Status: 404 Not Found
{
  "message": "Nenhum conteúdo encontrado para o tópico com ID: topic_nao_existe."
}

Exemplo de Resposta de Erro Interno:
Status: 500 Internal Server Error
{
  "message": "Erro interno do servidor ao obter conteúdo.",
  "error": "..."
}
*/