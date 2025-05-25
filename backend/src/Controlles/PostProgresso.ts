import { Response,Request } from "express";
import { TProgresso } from "../Types";
import connection from "../data/connection";
import { GeradorId } from "../Serviços/geradorId";

interface Progresso {
  id_user: string;
  id_etapa: string;
  concluida: boolean;
  data_conclusao?: Date;
}

export async function PostProgresso(
    req:Request,
    res:Response):Promise<void>
     {
    try{
      const {id_user,id_etapa,concluida}: Progresso = req.body;

      if (!id_user || !id_etapa || concluida === undefined){
        res.status(422).json({message: "preencha os campos respectivos:od_progresso ,id_user,id_etapa,concluida"})
      }

    const data_Conclusao = concluida ? new Date() : undefined;

    const NovoProgresso: TProgresso = {id_user,id_etapa,concluida};
    await connection("Progresso").insert({
    id_user:NovoProgresso.id_user,
    id_etapa:NovoProgresso.id_etapa,
    concluida:NovoProgresso.concluida,
    data_Conclusao
    });

    res.status(201).json({
      message: "Progresso registrado com sucesso!"});
    }catch(error:any){
    console.error("Erro ao salvar no banco:", error);
    res.status(500).json({ message: "Erro interno ao salvar progresso" });
    }
}