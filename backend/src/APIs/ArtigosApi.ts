import axios from "axios";
import { Request,Response } from "express";


export async function GetArtigos(req:Request,res:Response):Promise<void> {
    try{
        const searchTerm = req.query.term as string || "mental health";
        const url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi";
        const params={
            db: "pubmed",
            term: searchTerm,
            retmode: "json",
            retmax: 10,
        }

        const response= await axios.get(url,{params})

        const idList = response.data.esearchresult.idlist;
        const articles = idList.map((id: string) => ({
            id,
            link: `https://pubmed.ncbi.nlm.nih.gov/${id}/`
        }));

        res.status(200).json({ articles });
    }catch(error:any){
        console.error("Erro ao buscar dados:", error);
        res.status(500).send("Erro interno do servidor");
    }
}