import { Request, Response } from "express";
import testDbConnection from "../dataTest/connectionTestServer";
import { Topic } from "../models/Types";
import connection from "../data/connection";


/**
 * Rota POST para adicionar uma ou múltiplas trilhas ao banco de dados.
 * Espera um array de objetos TTrilhas no corpo da requisição.
 * @param {Request} req - Objeto de requisição do Express.
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<void>}
 */
export default async function InsertTopicosProduction(
  req: Request,
  res: Response
): Promise<void> {
  try {

  // Este código valida o corpo da requisição para garantir que seja um array de objetos 'topico' não vazio.
 // Ele verifica se cada objeto 'topico' dentro do array contém as propriedades essenciais:
 // 'fk_id_trilha', 'description', 'title' e 'order_position'.
 // Se a validação falhar em qualquer ponto, uma resposta de erro apropriada é enviada.
    const topicos:Topic[] = req.body;

    if (!Array.isArray(topicos) || topicos.length === 0) {
      res.status(400).json({ message: "O corpo da requisição deve ser um array de tópicos não vazio." });
      return;
    }

    for (const topico of topicos) {
      if (!topico.fk_id_trilha || !topico.description || !topico.title || !topico.order_position) {
        res.status(422).json({ message: "Cada trilha deve conter os campos corretos'." });
        return;
      }
    }

  
  // Este código itera por uma matriz de tópicos a serem inseridos,
 // gera um ID exclusivo para cada um com base na contagem atual de registros na tabela 'topics'
 // e, em seguida, insere o objeto 'topic' formatado na tabela 'topics' no banco de dados.
 // Finalmente, ele envia uma resposta de sucesso com o número de tópicos adicionados e os dados dos tópicos inseridos.
 const insertedTopics = [];
 for (const topic of topicos) {
     // Obter o tamanho atual da tabela 'topics'
     const countResult = await connection('topics').count('id as count').first();
     const count = countResult ? parseInt(countResult.count as string, 10) : 0;
     const newTopicId: string = `topic_${count + insertedTopics.length + 1}`;

     const formattedTopic = {
         id: newTopicId,
         fk_id_trilha: topic.fk_id_trilha,
         order_position: topic.order_position,
         description: topic.description,
         title: topic.title
     };

     await connection("topics").insert(formattedTopic);
     insertedTopics.push(formattedTopic);
 }

 res.status(201).json({ message: `${insertedTopics.length} tópico(s) adicionado(s) com sucesso.`, inserted: insertedTopics });

  } catch (error: any) {
    console.error("Erro ao adicionar topico(s):", error);
    res.status(500).json({ message: "Erro ao adicionar topico(s)", error: error.message });
  }
}

/*
  Exemplo de corpo de requisição (req.body) para testar a função InsertTopicosNoTestDB:

  Este é um array JSON de objetos Topic. Cada objeto deve incluir um 'fk_id_trilha'
  válido que referencia uma trilha existente, além de 'description', 'title' e 'order_position'.
*/
/*
[
  {
    "fk_id_trilha": "trilha_123",
    "order_position": 1,
    "description": "Este é o primeiro tópico sobre fundamentos de programação.",
    "title": "Introdução aos Fundamentos"
  },
  {
    "fk_id_trilha": "trilha_123",
    "order_position": 2,
    "description": "Um mergulho em estruturas de dados básicas e suas aplicações.",
    "title": "Estruturas de Dados Essenciais"
  },
  {
    "fk_id_trilha": "trilha_456",
    "order_position": 1,
    "description": "Visão geral das principais tendências em inteligência artificial.",
    "title": "Panorama da IA"
  }
]
*/