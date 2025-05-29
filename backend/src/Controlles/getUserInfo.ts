import { Request, Response } from "express";
import connection from "../data/connection";

export default async function GetNomesUsuarios(
  req: Request,
  res: Response
): Promise<void> {
  try {
    // Busca todos os nomes na tabela usuario
    const usuarios = await connection("usuario").select("nome");

    if (usuarios.length === 0) {
      res.status(404).json({ message: "Nenhum usuário encontrado." });
      return;
    }

    // Retorna só os nomes
    res.status(200).json(usuarios);
  } catch (error: any) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ message: "Erro ao buscar usuários", error: error.message });
  }
}
