import connection from "../data/connection";
import { Request,Response } from "express";
import { Authenticator } from '../Serviços/Authention';


export async function GetUpload(
    req:Request,
    res:Response
):Promise<void>{
    try{
    const userToken  = req.headers.authorization;
    const auth = new Authenticator()
    console.log(userToken)

    if (!userToken) {
    res.status(400).json({ message: "ID do usuário obrigatório" });
    return;
        }

    const  userId  = auth.getTokenData(userToken)?.id

  const videos = await connection("media")
            .join("videos_info", "media.id_media", "videos_info.media_id")
            .select(
                "media.url",
                "media.file_name",
                "videos_info.title",
                "videos_info.description",
                "videos_info.views",
                "videos_info.viewed"
            )
            .where("media.id_user", userId)
            .andWhere("media.file_type", "video");

    if (videos.length === 0) {
    res.status(404).json({ message: "Nenhum vídeo encontrado para este usuário." });
     return;
     }

        res.json({ videos });
        return;
    }catch(error:any){
 console.error("Erro ao buscar vídeos:", error);
        res.status(500).json({ message: "Erro ao buscar vídeos", error: error.message });
    }
}