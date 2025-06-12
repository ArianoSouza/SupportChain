import { Request, Response } from "express";
import testDbConnection from "../dataTest/connectionTestServer";
import { Trilha } from "../models/Types"; // Assumindo que o tipo Trilha está definido em Types.ts
import connection from "../data/connection";

/**
 * Função para buscar todas as trilhas do banco de dados e retorná-las.
 * @param {Request} req - O objeto de requisição do Express.
 * @param {Response} res - O objeto de resposta do Express.
 * @returns {Promise<void>}
 */
export default async function GetAllTrilhasProduction(
  req: Request,
  res: Response
): Promise<void> {
  try {
    // Busca todas as trilhas na tabela 'trilhas'
    // Certifique-se de que o nome da sua tabela no banco é 'trilhas'
    const trilhas: Trilha[] = await connection("trilhas").select(
      "id",
      "title",
      "icon"
    );

    // Verifica se alguma trilha foi encontrada
    if (trilhas.length === 0) {
      res.status(404).json({ message: "Nenhuma trilha encontrada." });
      return;
    }

    // Retorna as trilhas encontradas
    res.status(200).json({
      message: "Trilhas recuperadas com sucesso!",
      trilhas: trilhas
    });

  } catch (error: any) {
    // Trata erros de servidor
    console.error("Erro ao buscar todas as trilhas:", error);
    res.status(500).json({ message: "Erro interno do servidor ao obter trilhas.", error: error.message });
  }
}

/*
Exemplo de Requisição (no Postman/Insomnia):

GET http://localhost:PORTA_DA_SUA_API/get-all-trilhas

Não são necessários headers de autenticação ou corpo, a menos que você adicione uma lógica para isso.

Exemplo de Resposta de Sucesso:
Status: 200 OK
{
  "message": "Trilhas recuperadas com sucesso!",
  "trilhas": [
    {
      "id": "trilha_1",
      "title": "Desenvolvimento Web",
      "icon": "web-icon.png"
    },
    {
      "id": "trilha_2",
      "title": "Inteligência Artificial",
      "icon": "ai-icon.png"
    }
  ]
}

Exemplo de Resposta sem Trilhas:
Status: 404 Not Found
{
  "message": "Nenhuma trilha encontrada."
}

Exemplo de Resposta de Erro Interno:
Status: 500 Internal Server Error
{
  "message": "Erro interno do servidor ao obter trilhas.",
  "error": "..."
}
*/