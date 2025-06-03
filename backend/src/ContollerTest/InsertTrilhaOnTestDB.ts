import { Request, Response } from "express";
import connection from "../data/connection";
import { Trilha } from "../models/Types"; // Certifique-se de que TTrilhas está definido corretamente
import { testDBTestConnection } from "./testDBTest";
import testDbConnection from "../dataTest/connectionTestServer";

/**
 * Função para inserir uma ou múltiplas trilhas no banco de dados.
 * O corpo da requisição (req.body) deve ser um array de objetos TTrilhas.
 * @param {Request} req - O objeto de requisição do Express.
 * @param {Response} res - O objeto de resposta do Express.
 * @returns {Promise<void>}
 */
export default async function InsertTrilhaNoTestDB(
  req: Request,
  res: Response
): Promise<void> {
  try {
    // Espera que o corpo da requisição seja um array de TTrilhas
    const trilhasToInsert: Trilha[] = req.body;

    // Validação inicial: verifica se é um array e se não está vazio
    if (!Array.isArray(trilhasToInsert) || trilhasToInsert.length === 0) {
      res.status(422).json({ message: "O corpo da requisição deve ser um array de trilhas e não pode estar vazio." });
      return;
    }

    // Validação de cada objeto no array
    for (const trilha of trilhasToInsert) {
      if ( !trilha.title || !trilha.icon) {
        res.status(422).json({ message: "Todos os objetos de trilha devem conter os campos: 'nome', 'descricao', 'objetivo'." });
        return; // Retorna se qualquer trilha no array for inválida
      }
    }

  // Este código itera por uma matriz de trilhas a serem inseridas,
 // gera um ID exclusivo para cada uma com base na contagem atual de registros na tabela 'trilhas'
 // e, em seguida, insere o objeto 'trilha' formatado na tabela 'trilhas' no banco de dados.
 // Finalmente, ele envia uma resposta de sucesso com o número de trilhas adicionadas e os dados das trilhas inseridas.
    const insertedTrilhas = [];
    for (const trilha of trilhasToInsert) {
        // Obter o tamanho atual da tabela 'trilhas'
        const countResult = await testDbConnection('trilhas').count('id as count').first();
        const count = countResult ? parseInt(countResult.count as string, 10) : 0;
        const newTrilhaId: string = `trilha_${count + insertedTrilhas.length + 1}`;

        const formattedTrilha = {
            id: newTrilhaId,
            title: trilha.title,
            icon: trilha.icon
        };

        await testDbConnection("trilhas").insert(formattedTrilha);
        insertedTrilhas.push(formattedTrilha);
    }

  res.status(201).json({ message: `${insertedTrilhas.length} trilha(s) adicionada(s) com sucesso.`, inserted: insertedTrilhas });

  } catch (error: any) {
    console.error("Erro ao inserir trilha(s):", error);
    res.status(500).json({ message: "Erro interno ao inserir trilha(s)", error: error.message });
  }
}

/// exemplo de entrada (ignorar os temas)
/*
[
  {
    "title": "Introdução à Programação",
    "icon": "icon_code.png"
  },
  {
    "title": "Desenvolvimento Web Fullstack",
    "icon": "icon_web.png"
  }
]
*/ 