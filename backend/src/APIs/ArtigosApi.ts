import axios from "axios";
import { Request, Response } from "express";
import { parseStringPromise } from "xml2js";

export async function GetArtigos(req: Request, res: Response): Promise<void> {
  try {
    const searchTerm = (req.query.term as string) || "mental health";

    const searchUrl = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi";
    const searchParams = {
      db: "pubmed",
      term: searchTerm,
      retmode: "json",
      retmax: 10,
    };

    const searchResponse = await axios.get(searchUrl, { params: searchParams });
    const idList = searchResponse.data.esearchresult.idlist;

    if (idList.length === 0) {
      res.status(200).json({ articles: [] });
      return;
    }

    const fetchUrl = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi";
    const fetchParams = {
      db: "pubmed",
      id: idList.join(","),
      retmode: "xml",
    };

    const fetchResponse = await axios.get(fetchUrl, { params: fetchParams });
    const xmlData = fetchResponse.data;

    const parsed = await parseStringPromise(xmlData, { explicitArray: false });
    const articlesRaw = parsed.PubmedArticleSet.PubmedArticle;
    const articles = Array.isArray(articlesRaw) ? articlesRaw : [articlesRaw];

    const formatted = articles.map((article: any) => {
      const pmid = article.MedlineCitation.PMID._ || article.MedlineCitation.PMID;
      const title = article.MedlineCitation.Article.ArticleTitle;

      const authorList = article.MedlineCitation.Article.AuthorList?.Author;
      let authors: string[] = [];

      if (Array.isArray(authorList)) {
        authors = authorList.map((a: any) => {
          const last = a.LastName || '';
          const fore = a.ForeName || '';
          return `${fore} ${last}`.trim();
        });
      } else if (authorList) {
        const last = authorList.LastName || '';
        const fore = authorList.ForeName || '';
        authors = [`${fore} ${last}`.trim()];
      }

      // 🎯 MeSH terms (tags)
      const meshList = article.MedlineCitation.MeshHeadingList?.MeshHeading;
      let tags: string[] = [];

      if (Array.isArray(meshList)) {
        tags = meshList.map((m: any) => {
          const descriptor = m.DescriptorName?._ || m.DescriptorName;
          return descriptor;
        });
      } else if (meshList?.DescriptorName) {
        const descriptor = meshList.DescriptorName._ || meshList.DescriptorName;
        tags = [descriptor];
      }

      return {
        id: pmid,
        title: title,
        authors: authors.join(', ') || 'Desconhecido',
        tags: tags,
        link: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`,
      };
    });

    res.status(200).json({ articles: formatted });

  } catch (error: any) {
    console.error("Erro ao buscar dados:", error);
    res.status(500).send("Erro interno do servidor");
  }
}
