import { Request,Response } from "express";
import connection from "../data/connection";


export async function GetProcesso(
    req:Request,
    res:Response
):Promise<void> {
    try{
     const {id_user}= req.params;

     if(!id_user){
    res.status(400).json({ message: "O id_user é obrigatório!" });
     }

     const progresso = await connection("Progresso")
     .where("id_user", '=', id_user)
     .select("*");

      if (progresso.length === 0) {
      res.status(404).json({ message: "Nenhum progresso encontrado para esse usuário!" });
    }

    res.status(200).json(progresso);
    }catch(error:any){
    console.error("Erro ao buscar progresso:", error);
    res.status(500).json({ message: "Erro interno ao buscar progresso!" });
    }
}