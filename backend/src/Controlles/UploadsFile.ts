import multer from "multer";
import { Request,Response } from "express";
import connection from "../data/connection";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload= multer({ dest: 'uploads/' });

export async function UploadFile(
    req:Request,
    res:Response
):Promise<void> {
    try{
    console.log("Headers recebidos:", req.headers);
    const user_id = req.headers["user_id"] || req.headers["user_id"]; 
    console.log("User ID capturado:", user_id);

      if (!user_id) {
       res.status(400).json({ message: "ID do usuário obrigatório" })
        }

    console.log("Arquivo recebido:", req.file);
    if (!req.file) {
    res.status(400).json({ message: "Arquivo não enviado. Verifique se o campo 'file' está correto no Postman." });
    return;
    }

    const result = await cloudinary.uploader.upload(req.file.path,{
    resource_type: "video"
    });

    const file_name = req.file.originalname;
    const url = result.secure_url;
    const file_extension = file_name.split('.').pop()?.toLowerCase();
    const file_type = ["mp4", "mov", "avi", "mkv"].includes(file_extension!) ? "video" : "image";
    await connection("media").insert({
    id_user: user_id,
    file_name,
    url,
    file_type,
});
   res.json({ message: "Upload bem-sucedido!", media: { id_user: user_id, file_name, url } });
    }catch(error:any){
    console.error("Erro no upload:", error);
    res.status(500).json({ message: "Erro ao enviar arquivo",error: error.message  });
    }
}