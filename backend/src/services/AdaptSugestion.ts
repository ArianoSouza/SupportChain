// src/services/tagAnalysisService.ts (Versão 2)

/**
 * Analisa um array de tags, contando a ocorrência de cada tag
 * e retornando-as como um array de strings, ordenadas pela frequência
 * (da maior para a menor). Cada tag única aparecerá uma vez.
 *
 * @param tags Array de strings, onde cada string é uma tag.
 * @returns Um array de strings, contendo as tags únicas ordenadas por contagem decrescente.
 * Retorna um array vazio se o input for nulo ou vazio.
 */
export function AdaptSugestion(tags: string[] | null | undefined): string[] {
    // Retorna um array vazio se o input for nulo, undefined ou vazio
    if (!tags || tags.length === 0) {
      return [];
    }
  
    // 1. Contar a ocorrência de cada tag
    const tagFrequencies: { [key: string]: number } = {};
  
    for (const tag of tags) {
      // Normaliza a tag (para minúsculas e remove espaços extras)
      const normalizedTag = tag.toLowerCase().trim();
  
      if (normalizedTag) { // Garante que não estamos contando tags vazias após o trim
        tagFrequencies[normalizedTag] = (tagFrequencies[normalizedTag] || 0) + 1;
      }
    }
  
    // 2. Converter o objeto de frequências em um array de pares [tag, count]
    // Isso facilita a ordenação
    const tagEntries = Object.entries(tagFrequencies);
  
    // 3. Ordenar o array de pares pela contagem em ordem decrescente
    tagEntries.sort((a, b) => b[1] - a[1]); // b[1] é a contagem de b, a[1] é a contagem de a
  
    // 4. Mapear o array ordenado para retornar apenas as tags (primeiro elemento do par)
    const orderedTags = tagEntries.map(entry => entry[0]);
  
    return orderedTags;
  }
  
  // --- Exemplos de Uso (para testar) ---
  
  /*
  // Exemplo 1: Tags comuns
  const videoTags1 = [
    "programming", "tutorial", "javascript", "webdev", "programming", "frontend",
    "javascript", "tutorial", "react", "programming", "webdev"
  ];
  const orderedTags1 = analyzeAndOrderTags(videoTags1);
  console.log("Exemplo 1 (Tags Comuns):", orderedTags1);
  // Saída esperada: [ 'programming', 'javascript', 'tutorial', 'webdev', 'frontend', 'react' ]
  // (A ordem entre tags com a mesma contagem pode variar dependendo da implementação do sort,
  // mas as tags com maior contagem virão primeiro)
  
  
  // Exemplo 2: Tags com casos mistos e espaços
  const videoTags2 = [
    "Node.js", "node.js ", "Database", "database", "API", "api", "Node.js"
  ];
  const orderedTags2 = analyzeAndOrderTags(videoTags2);
  console.log("Exemplo 2 (Casos Mistos):", orderedTags2);
  // Saída esperada: [ 'node.js', 'database', 'api' ]
  
  // Exemplo 3: Array vazio
  const videoTags3: string[] = [];
  const orderedTags3 = analyzeAndOrderTags(videoTags3);
  console.log("Exemplo 3 (Array Vazio):", orderedTags3);
  // Saída esperada: []
  
  // Exemplo 4: Array com tags duplicadas vazias ou apenas espaços
  const videoTags4 = ["tag1", " ", "", "tag2", "tag1", "   "];
  const orderedTags4 = analyzeAndOrderTags(videoTags4);
  console.log("Exemplo 4 (Tags Vazias):", orderedTags4);
  // Saída esperada: [ 'tag1', 'tag2' ]
  
  */