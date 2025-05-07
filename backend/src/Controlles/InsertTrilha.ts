import { Request,Response } from "express";
import connection from "../data/connection";
import { TTrilhas } from "../Types";


export default async function InsertTrilha(
    req:Request,
    res:Response):Promise<void> {
    try{
    const {nome, descricao, objetivo}= req.body;
    if(!nome || !descricao || !objetivo){
    res.status(422).json({ message: "Preencha todos os campos: 'nome', 'descricao', 'objetivo'" })
    }

    const Insertnatrilha: TTrilhas = {nome, descricao,objetivo}
    await connection("trilha")
    .insert({
        nome: Insertnatrilha.nome,
        descricao: Insertnatrilha.descricao,
        objetivo: Insertnatrilha.objetivo,
    });

    res.status(200).json({Insertnatrilha})
    }catch(error:any){
        console.error("Erro ao inserir trilha:", error);
        res.status(500).json({ message: "Erro interno ao inserir trilha" });
    }
}