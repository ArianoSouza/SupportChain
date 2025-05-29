import { Request, Response } from "express";
import connection from "../data/connection";

export default async function GetAllTrilhas(
  req: Request,
  res: Response
): Promise<void> {
  try {
    // Busca todas as trilhas no banco
    const trilhas = await connection("trilha").select("*");

    // Verifica se encontrou algo
    if (trilhas.length === 0) {
      res.status(404).json({ message: "Nenhuma trilha encontrada." });
      return;
    }

    // Retorna as trilhas encontradas
    res.status(200).json(trilhas);
  } catch (error: any) {
    console.error("Erro ao buscar trilhas:", error);
    res.status(500).json({ message: "Erro ao buscar trilhas", error: error.message });
  }
}