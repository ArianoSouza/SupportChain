import { Request, Response } from "express";
import axios from "axios";

const API_URL = "https://openlibrary.org/search.json";

export async function GetBooks(req:Request,res:Response):Promise<void> {
    try{
     const {q,subject } = req.query;
     if (!q && subject) {
        res.status(400).json({ error: "É necessário informar 'q' ou 'subject' para a busca." });
        return;
    }
    let queryParams = new URLSearchParams();
    if (q) queryParams.append("q", q as string);
    if (subject) queryParams.append("q", `subject:${subject}`);
    queryParams.append("language", "por");
    const response = await axios.get(`${API_URL}?${queryParams.toString()}`)

    const books = response.data.docs.map((book: any) => ({
        title: book.title,
        author: book.author_name?.join(", ") || "Desconhecido",
        cover: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null
    }));

     res.status(200).json(books);
    }catch(error:any){
        res.status(500).json({ error: "Erro ao buscar livros." });
    }
}