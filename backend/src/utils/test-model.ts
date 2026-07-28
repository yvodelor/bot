

import { pipeline } from "@huggingface/transformers";

async function main() {
  const model = await pipeline(
    "feature-extraction",
    'Xenova/all-MiniLM-L6-v2'
  );

  const result = await model("Bonjour, comment allez-vous ?", {
    pooling: "mean",
    normalize: true,
  });

  console.log(result);
}

main().catch(console.error);