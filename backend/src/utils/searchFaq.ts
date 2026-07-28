import  cosineSimilarity  from "./cosineSmilarity";

export interface FaqItem {
  id: number
  activite_id: number
  keywords: string[] 
  response_default: string
  embedding: number[]
}

export interface SearchResult extends FaqItem{
  score: number
}

export const searchFAQ = (
  embeddingUser: number[],
  faq: any[],
  limit = 5,
  seuil = 0.80
): SearchResult[] => {

  const results = faq
  .map((item) => {

    const emb = Array.isArray(item.embedding)
      ? item.embedding
      : [];

    if (!emb.length || !embeddingUser?.length) {
      return { ...item, score: 0 };
    }

    const score = cosineSimilarity(embeddingUser, emb);

    return {
      ...item,
      score: isNaN(score) ? 0 : score,
    };
  })
  .filter(r => r.score > 0.3)
  .sort((a, b) => b.score - a.score)
  .slice(0, limit);
  
  console.log(results);
  return results;
};






