import { pool } from "../config/db";
import { createBaseService } from "./baseService";

type ScenarioIntent = {
    id: number;
    intent_id: string;
    scenario_id: string;
    action: string;
};

export const scenarioIntentService = {
    ...createBaseService<ScenarioIntent>(
        pool,
        "scenario_intent",
        ["id"]
    ),
};