
import { toSql } from "../utils/pgvector";
import {pool} from "../config/db";
import { createBaseService } from "./baseService";
import { createEmbedding } from "../utils/embedding";

type IntentEx = {
    id: number,
    intent_id: string,
   
    phrase: string,
    embedding?: string | null; 
}



type CreateIntentEx = Omit<IntentEx, "id" | "embedding">;


const base = createBaseService<IntentEx>(
  pool,
  "intent_exemple",
  ["id", "phrase"]
);

const prepareCreateData = async (data: CreateIntentEx) :Promise<Omit<IntentEx, "id">>  => {
  const textForEmbedding = ` ${data.phrase ?? ""} `;
  console.log(textForEmbedding)
  const embedding = await createEmbedding(textForEmbedding);

  console.log('embedding: ', embedding)
  return {
    ...data,
    embedding: await toSql(embedding),
  };
};

//Prepartion des données pour update 
const prepareUpdateData = async (data: IntentEx): Promise<IntentEx>  => {
  const textForEmbedding = ` ${data.phrase ?? ""} `;
  console.log(textForEmbedding)
  const embedding = await createEmbedding(textForEmbedding);

  console.log('embedding: ', embedding)
  return {
    ...data,
    embedding: await toSql(embedding),
  };
};



const create = async (data: Omit<IntentEx, "id">) => {
  const prepared = await prepareCreateData(data);
  return base.create(prepared);
};

const update = async (id: number, data: Partial<IntentEx>) => {
  const existing = await base.getById(id);

  if (!existing) {
    throw new Error("Exemple Intent introuvable");
  }

  const merged: IntentEx = {
    ...existing,
    ...data,
  };

  const prepared = await prepareUpdateData(merged);

  return base.update(id, prepared);
};


export const intentExService = {
  ...base,
  create,
  update,
};