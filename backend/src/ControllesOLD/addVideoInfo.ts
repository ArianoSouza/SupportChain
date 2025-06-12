import { Request,Response } from "express";
import connection from "../data/connection";


export async function addVideoInfo(
req:Request,
res:Response
):Promise<void> {
    try{
    const {media_id,title,description}= req.body;

     if (!media_id || !title || !description) {
            res.status(400).json({ message: "ID do vídeo, título e descrição são obrigatórios." });
            return;
        }
        
         await connection("videos_info").insert({
            media_id,
            title,
            description,
            views: 0, 
            viewed: false 
        });

     res.json({ message: "Informações do vídeo adicionadas com sucesso!" });
    }catch(error:any){
      console.error("Erro ao adicionar informações do vídeo:", error);
      res.status(500).json({ message: "Erro ao adicionar informações", error: error.message });
    }
}