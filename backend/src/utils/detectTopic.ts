import { createEmbedding } from "../utils/embedding";
//import { cosineSimilarity } from "../utils/cosineSimilarity";

type Topic = {
  id: number;
  code: string;
  keywords: string[];
  embedding: number[];
};

// 1. règles rapides → retourne id
function detectTopicQuick(message: string, topics: Topic[]): number | null {
  const msg = message.toLowerCase().trim();

  for (const topic of topics) {
    for (const kw of topic.keywords) {
      if (kw.toLowerCase() === msg) {
        return topic.id;
      }
    }
  }

  return null;
}

// 2. embedding fallback → retourne id
function detectTopicEmbedding(userEmbedding: number[], topics: Topic[]): number | null {
  let bestId: number | null = null;
  let bestScore = 0;

  for (const topic of topics) {
    const score = cosineSimilarity(userEmbedding, topic.embedding);

    if (score > bestScore) {
      bestScore = score;
      bestId = topic.id;
    }
  }

  // seuil de confiance
  if (bestScore < 0.75) return null;

  return bestId;
}

// 3. fonction principale
export async function detectTopic(
  message: string,
  topics: Topic[]
): Promise<number | null> {
  const clean = message.toLowerCase().trim();

  // 1. règle rapide
  const quick = detectTopicQuick(clean, topics);
  if (quick !== null) return quick;

  // 2. embedding fallback
  const userEmbedding = await createEmbedding(clean);

  return detectTopicEmbedding(userEmbedding, topics);
}