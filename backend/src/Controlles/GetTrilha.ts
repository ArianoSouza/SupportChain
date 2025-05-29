import { Request,Response } from "express";
import connection from "../data/connection";


export default async function GetTrilha(
    req:Request,
    res:Response
):Promise<void> 
{
    try{
      const nome = req.query.nome;
      
      const result = await connection('trilha')
      .select('*').where('nome',String(nome))

      res.status(200).json(result[0])
    }catch(error:any){
    res.status(500).json({message:"erro ao buscar trilha", showError:error.message})
    }
}