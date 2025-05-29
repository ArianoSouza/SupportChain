import { Request,Response } from "express";
import connection from "../data/connection";
import { TEtapas } from "../Types";

export default async function InsertEtapa(
    req:Request,
    res:Response
):Promise<void> 
{
   try{
      const {id_trilha,titulo,descricao}= req.body;
      
      if(!id_trilha || !titulo || !descricao){
      res.status(422).json({ message: "Preencha todos os campos: 'id_trilha', 'ordem', 'titulo', 'descricao'" })
      }

      const ultimaEtapa = await connection("etapa")
      .where({ id_trilha })
      .orderBy("ordem", "desc")
      .first();

      const novaOrdem = ultimaEtapa ? ultimaEtapa.ordem + 1 : 1;

      const InsertnaEtapa: TEtapas ={id_trilha,ordem: novaOrdem,titulo,descricao}
      await connection("etapa")
     .insert(InsertnaEtapa)

      res.status(200).json({etapa: InsertnaEtapa })
   } catch(error:any){
    res.status(500).json({ message: "Erro interno ao inserir etapa" })
   }
}