import  { pipeline} from '@huggingface/transformers'
import { normalizeText } from './normalizeText';

let extractor: any = null;




export async function loadModel() {
  if (!extractor) {
    extractor = await pipeline(
      'feature-extraction',
      "Xenova/paraphrase-multilingual-MiniLM-L12-v2",
    );
  }

  return extractor;
}


export async function createEmbedding(text: string):  Promise<number[]> {

  const textEmb = normalizeText(text);


  
  const model = await loadModel();

  
  const output = await model(textEmb, {
    pooling: 'mean',
    normalize: true,
  });

  return Array.from(output.data);
}