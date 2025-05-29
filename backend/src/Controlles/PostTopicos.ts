import connection from "../data/connection";
import { Request,Response } from "express";

export async function PostTopicos(
    req:Request,
    res:Response
):Promise<void> {
   try{
     const {order_position,title,description,conteudos}= req.body;

      if (!order_position || !title || !description || !conteudos) {
            res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }
      
        await connection("topicos").insert({
            order_position,
            title,
            description,
            conteudos: JSON.stringify(conteudos)
        })

         res.status(201).json({ message: "Tópico criado com sucesso!" });
    } catch(error:any){
     console.error("Erro ao criar tópico:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
   }
}