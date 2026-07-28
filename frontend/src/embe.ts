function dot(a: number[], b: number[]) {
  return a.reduce((sum, val, i) => sum + val * b[i], 0)
}

function norm(a: number[]) {
  return Math.sqrt(a.reduce((sum, val) => sum + val * val, 0))
}

export function cosineSimilarity(a: number[], b: number[]) {
  return dot(a, b) / (norm(a) * norm(b))
}

{/*****************************/}

const faq = [
  {
    q: "Comment reset mon mot de passe ?",
    a: "Clique sur reset",
    embedding: [0.2, 0.8, 0.1]
  },
  {
    q: "Comment changer email ?",
    a: "Va dans settings",
    embedding: [0.1, 0.7, 0.2]
  }
]



{/**************************** */}

function cosineSimilarity(a: number[], b: number[]) {
  const dot = a.reduce((s, v, i) => s + v * b[i], 0)
  const normA = Math.sqrt(a.reduce((s, v) => s + v * v, 0))
  const normB = Math.sqrt(b.reduce((s, v) => s + v * v, 0))
  return dot / (normA * normB)
}


/*********************************** */

function searchFAQ(queryEmbedding: number[]) {
  let best = null
  let bestScore = 0

  for (const item of faq) {
    const score = cosineSimilarity(queryEmbedding, item.embedding)

    if (score > bestScore) {
      bestScore = score
      best = item
    }
  }

  return best
}


/********************5 meilleur reponse ********************* */
function searchFAQ(queryEmbedding: number[]) {
  return faq
    .map((item) => {
      const score = cosineSimilarity(queryEmbedding, item.embedding)
      return { ...item, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
}

/******************************* */

function searchFAQ(queryEmbedding: number[]) {
  const results = []

  for (const item of faq) {
    const score = cosineSimilarity(queryEmbedding, item.embedding)
    results.push({ ...item, score })
  }

  return results
    .filter(r => r.score > 0.3)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
}

return results
  .filter(r => r.score > 0.3)
  .sort((a, b) => b.score - a.score)
  .slice(0, 5)