import {pool}from "../config/db";
import { toSql } from "pgvector/pg";
import { createBaseService } from "./baseService";
import { createEmbedding } from "../utils/embedding";

type FaqDefault = {
  id: number;
  intent_id: string;
  question: string;
  reponse: string;
  activite_id: number;
  keywords: string;
  priority: string;
  embedding?: string | null;
};


type CreateFaqDefault = Omit<FaqDefault, "id" | "embedding">;




const base = createBaseService<FaqDefault>(
  pool,
  'faq_default',
  ["id", "embedding"]
);


//Prepartion des données pour create
const prepareCreateFaqData = async (
  data: CreateFaqDefault
): Promise<Omit<FaqDefault, "id">> => {

  const textForEmbedding = `
    ${data.question}
    ${data.keywords}
    ${data.reponse}
  `;

  const embedding = await createEmbedding(textForEmbedding);

  return {
    ...data,
    embedding: toSql(embedding)
  };
};


//Prepartion des données pour update 
const prepareUpdateFaqData = async (
  data: FaqDefault
): Promise<FaqDefault> => {

  const textForEmbedding = `
    ${data.question}
    ${data.keywords}
    ${data.reponse}
  `;

  const embedding = await createEmbedding(textForEmbedding);

  return {
    ...data,
    embedding: toSql(embedding)
  };
};


const create = async (data: CreateFaqDefault) => {
  const prepared = await prepareCreateFaqData(data);
  return base.create(prepared);
};

const update = async (id: number, data: Partial<FaqDefault>) => {
  const existing = await base.getById(id);

  if (!existing) {
    throw new Error("FAQ introuvable");
  }

  const merged: FaqDefault = {
    ...existing,
    ...data,
  };

  const prepared = await prepareUpdateFaqData(merged);

  return base.update(id, prepared);
};


export const faqDefaultService = {
  ...base,
  create,
  update,
};