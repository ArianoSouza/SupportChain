import { Request,Response } from "express";
import connection from "../data/connection";

export default async function GetEtapa(
    req:Request,
    res:Response
):Promise<void> 
{
    try{
    const titulo = req.query.titulo;

    const result = await connection('Etapas')
    .select('*').where('titulo',String(titulo))

    res.status(200).json(result[0]);
    }catch(error:any){
    res.status(500).json({message: "erro ao buscar a etapa"})
    }
}