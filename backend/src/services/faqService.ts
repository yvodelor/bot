import {pool}from "../config/db";
import { toSql } from "../utils/pgvector";
import { createBaseService } from "./baseService";
import { createEmbedding } from "../utils/embedding";

type Faq = {
  id: number;
  question: string;
  reponse: string;
  priority: string;
  business_id?: string;
  embedding?: string | null;
};


type CreateFaq = Omit<Faq, "id" | "embedding">;




const base = createBaseService<Faq>(
  pool,
  'faq',
  ["id", "embedding"]
);


//Prepartion des données pour create
const prepareCreateFaqData = async (
  data: CreateFaq
): Promise<Omit<Faq, "id">> => {

  const textForEmbedding = `${data.question}`;

  const embedding = await createEmbedding(textForEmbedding);

  return {
    ...data,
    embedding: await toSql(embedding)
  };
};


//Prepartion des données pour update 
const prepareUpdateFaqData = async (
  data: Faq
): Promise<Faq> => {

  const textForEmbedding = `${data.question}`;

  const embedding = await createEmbedding(textForEmbedding);

  return {
    ...data,
    embedding: await toSql(embedding)
  };
};


const create = async (data: CreateFaq) => {
  const prepared = await prepareCreateFaqData(data);
  return base.create(prepared);
};

const update = async (id: number, data: Partial<Faq>) => {
  const existing = await base.getById(id);

  if (!existing) {
    throw new Error("FAQ introuvable");
  }

  const merged: Faq = {
    ...existing,
    ...data,
  };

  const prepared = await prepareUpdateFaqData(merged);

  return base.update(id, prepared);
};


export const faqService = {
  ...base,
  create,
  update,
};