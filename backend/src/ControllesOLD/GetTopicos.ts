import { Request,Response } from "express";
import connection from "../data/connection";

export async function GetTopicos(
    req:Request,
    res:Response
):Promise<void> {
    try{
    const {id_topicos}= req.params;

    const topic = await connection("topicos")
    .where({id_topicos})
    .first();

     if (!topic) {
        res.status(404).json({ message: "Tópico não encontrado" });
        }

        res.status(200).json(topic);
    }catch(error:any){
     console.error("Erro ao buscar tópico:", error);
     res.status(500).json({ message: "Erro interno do servidor" });
    }
}