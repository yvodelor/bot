import { pool } from "../config/db";
import { createBaseService } from "./baseService";

type Intent = {
    id: number;
    nom: string;
    activite_id: number;
    keywords: string;
    keywords_en: string;
    priority: string;
    scenario_id: string;
};

export const intentService = {
    ...createBaseService<Intent>(
        pool,
        "intent",
        ["id", "nom"]
    ),
};