import { Request, Response } from "express";
import testDbConnection from "../dataTest/connectionTestServer";
import { Video } from "../models/Types"; // Assuming Video type is defined in Types.ts

/**
 * Função para buscar um vídeo pelo seu ID e retorná-lo,
 * excluindo o atributo 'likes' e incluindo a contagem de likes.
 * @param {Request} req - O objeto de requisição do Express, contendo o ID do vídeo nos parâmetros.
 * @param {Response} res - O objeto de resposta do Express.
 * @returns {Promise<void>}
 */
export default async function GetVideoByIdFromTestDB(
 req: Request,
 res: Response
): Promise<void> {
 try {
 const videoId: string = req.params.id;

 // Validação inicial: verifica se o ID foi fornecido
 if (!videoId) {
 res.status(400).json({ message: "O ID do vídeo é obrigatório." });
 return;
 }

 // Busca o vídeo no banco de dados pelo ID
 const video: Video | undefined = await testDbConnection("videos")
 .where({ id: videoId })
 .first();

 // Verifica se o vídeo foi encontrado
 if (!video) {
 res.status(404).json({ message: "Vídeo não encontrado." });
 return;
 }

 // Cria um novo objeto para o vídeo, excluindo 'likes' e adicionando 'likesCount'
 const { likes, ...videoWithoutLikes } = video;
 const likesCount: number = likes ? likes.length : 0;

 const videoToReturn = {
 ...videoWithoutLikes,
 likesCount: likesCount,
 };

 res.status(200).json(videoToReturn);

 } catch (error: any) {
 console.error("Erro ao buscar vídeo por ID:", error);
 res.status(500).json({ message: "Erro interno ao buscar vídeo.", error: error.message });
 }
}

/*
Exemplo de Saída (Output):

Se o vídeo no banco de dados for (antes do processamento):
{
  "id": "video_abc123",
  "title": "Introdução ao TypeScript",
  "description": "Um guia completo para começar com TypeScript.",
  "tags": ["typescript", "programacao", "frontend"],
  "likes": ["user_001", "user_002", "user_005"], // Este array é o que não será retornado diretamente
  "tumbURL": "https://example.com/thumbnails/ts_intro.jpg",
  "URL": "https://example.com/videos/ts_intro.mp4"
}

A resposta HTTP para uma requisição GET para /videos/video_abc123 será:

Status: 200 OK
Body:
{
  "id": "video_abc123",
  "title": "Introdução ao TypeScript",
  "description": "Um guia completo para começar com TypeScript.",
  "tags": ["typescript", "programacao", "frontend"],
  "tumbURL": "https://example.com/thumbnails/ts_intro.jpg",
  "URL": "https://example.com/videos/ts_intro.mp4",
  "likesCount": 3 // O array 'likes' foi substituído pela sua contagem
}

Caso o vídeo não seja encontrado:

Status: 404 Not Found
Body:
{
  "message": "Vídeo não encontrado."
}

Caso o ID não seja fornecido nos parâmetros:

Status: 400 Bad Request
Body:
{
  "message": "O ID do vídeo é obrigatório."
}

*/