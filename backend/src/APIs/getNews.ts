import axios from "axios";
import { Request,Response } from "express";

const API_URL = "https://newsapi.org/v2/everything";


export async function GetNews(req: Request, res:Response):Promise<void>{
    try{
        const { query = "saude" }= req.query;
        console.log(`🔍 Buscando notícias para Query: ${query}`);
        const response = await axios.get(API_URL, {
            params: {
                apiKey:`5146eecdda9f43e4a1e7c90260454921`,
                q: query,
                language: "pt",
                pageSize: 10,
            },
        });

        console.log("🔍 Resposta completa da API:", response.data);

        if (!response.data || !response.data.articles || !Array.isArray(response.data.articles)) {
            res.status(500).json({ erro: "Erro ao obter notícias: resposta inválida." });
            return;
        }

        if (response.data.articles.length === 0) {
            res.status(404).json({ erro: "Nenhuma notícia encontrada." });
            return;
        }

        const formattedNews = response.data.articles.map((article: any) => ({
            titulo: article.title || "Título não disponível",
            descricao: article.description || "Descrição não disponível",
            url: article.url,
            imagem: article.urlToImage || "Sem imagem disponível",
            publicado_em: article.publishedAt,
            autor: article.author || "Autor desconhecido",
        }));

        console.log("✅ Resposta da API:", response.data);
        res.status(200).json({ noticias: formattedNews });
    }catch(error:any){
        console.error("Erro ao buscar notícias:", error);
        res.status(500).json({ erro: "Erro ao buscar notícias" });
    }
}
