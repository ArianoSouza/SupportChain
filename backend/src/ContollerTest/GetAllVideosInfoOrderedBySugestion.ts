import { Request, Response } from "express";
import testDbConnection from "../dataTest/connectionTestServer";
import { Video, ClickTag } from "../models/Types"; // Assumindo que Video e ClickTag estão definidos em Types.ts
import { AdaptSugestion } from "../services/AdaptSugestion"; // Importa a função AdaptSugestion
import jwt from "jsonwebtoken"; // Assumindo que você tem jwt para decodificação de token

export default async function GetAllVideosInfoOrderBySugestion(
  req: Request,
  res: Response
): Promise<void> {
  try {
    // Valida e decodifica o token dos parâmetros
    const token = req.params.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Token de autenticação é obrigatório." });
      return;
    }

    let userId: string;
    try {
      // Decodifica o token para obter o ID do usuário
      const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET as string);
      userId = decodedToken.id;
    } catch (error: any) {
      res.status(403).json({ message: "Token inválido ou expirado.", error: error.message });
      return;
    }

    // Obtém todas as informações dos vídeos
    const videos: Video[] = await testDbConnection("videos").select(
      "id",
      "title",
      "tags",
      "likes",
      "tumbURL"
    );

    // Obtém as tags de interesse do usuário da tabela ClickTags
    const userClickTags: ClickTag | undefined = await testDbConnection("clicktags")
      .where({ fk_user_id: userId })
      .first();

    // Se nenhuma entrada ClickTag ou tags de interesse do usuário forem encontradas,
    // retorna os vídeos sem ordenação personalizada.
    if (!userClickTags || !userClickTags.videos || userClickTags.videos.length === 0) {
      res.status(200).json({
        message: "Nenhum dado de interesse do usuário encontrado, retornando vídeos sem ordem personalizada.",
        videos: videos.map(video => ({
          id: video.id,
          title: video.title,
          tags: video.tags,
          likesCount: video.likes ? video.likes.length : 0,
          tumbURL:video.tumbURL
        })),
      });
      return;
    }

    // --- Mudança aqui: Usamos APENAS as tags de interesse do usuário para Adaptação ---
    const userInterestedTags: string[] = userClickTags.videos;
    
    // Adapta as tags de interesse do usuário para obter uma lista ordenada por frequência
    const orderedSuggestedTags = AdaptSugestion(userInterestedTags);

    // Calcula uma pontuação para cada vídeo e os ordena
    const videosWithScore = videos.map(video => {
      let score = 0;
      video.tags.forEach(tag => {
        const normalizedTag = tag.toLowerCase().trim();
        const indexInSuggested = orderedSuggestedTags.indexOf(normalizedTag);
        if (indexInSuggested !== -1) {
          // Quanto mais cedo a tag aparece na lista sugerida (mais relevante para o usuário), maior a pontuação.
          score += (orderedSuggestedTags.length - indexInSuggested);
        }
      });
      return { video, score };
    });

    // Classifica os vídeos pela pontuação em ordem decrescente
    videosWithScore.sort((a, b) => b.score - a.score);

    // Mapeia para o formato de resposta final
    const orderedVideos = videosWithScore.map(item => ({
      id: item.video.id,
      title: item.video.title,
      tags: item.video.tags,
      likesCount: item.video.likes ? item.video.likes.length : 0,
    }));

    res.status(200).json({ message: "Vídeos recuperados e ordenados pelas tags de interesse do usuário!", videos: orderedVideos });

  } catch (error: any) {
    console.error("Erro ao obter e ordenar vídeos:", error);
    res.status(500).json({ message: "Erro interno do servidor ao obter vídeos", error: error.message });
  }
}