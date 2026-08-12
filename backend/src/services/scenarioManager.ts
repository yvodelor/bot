
import { pool } from "../config/db";
import type { FieldSchema } from "../utils/extraireData";
import { replacePlaceholders } from "../utils/fonctions";

import {
    ExtractionResult,
    ExtractionService
} from "./extractionService";

export class ScenarioManager {

    /**
     * Démarrer un scénario
     */
    static async start(
        sessionId: string,
        scenarioId: number
    ) {

        await pool.query(
            `
            UPDATE chat_session
            SET
                scenario_id=$1,
                step_order=1,
                variables='{"scenario":{}}'::jsonb
            WHERE id=$2
            `,
            [
                scenarioId,
                sessionId
            ]
        );

        /*
         * On cherche directement la première étape
         * dont la donnée est manquante.
         */
        const variables = {
            scenario: {}
        };

        const nextStep =
            await this.findNextMissingStep(
                scenarioId,
                variables
            );

        if (!nextStep) {
            return this.finishScenario(
                sessionId,
                variables
            );
        }

        await this.saveProgress(
            sessionId,
            variables,
            nextStep
        );

        return this.buildNextStepResponse(
            nextStep,
            variables
        );
    }


    /**
     * Vérifie si une session possède un scénario actif
     */
    static hasScenario(
        session: any
    ): boolean {

        return (
            session.scenario_id !== null &&
            session.scenario_id !== undefined &&
            session.step_order !== null &&
            session.step_order !== undefined
        );
    }



/**
 * Traitement principal
 */
static async handle(
    session: any,
    message: string,
    tenantData: any
) {

    const currentStep =
        await this.loadCurrentStep(session);


    if (!currentStep) {

        return this.finishScenario(
            session.id,
            session.variables
        );
    }


    /*
     * Extraire toutes les données possibles
     * présentes dans le message.
     */
    const extracted =
        await this.extractScenarioData(
            session.scenario_id,
            message,
            tenantData,
            session.business_id
        );


    console.log(
        "[ScenarioManager] Extraction :",
        extracted
    );


    /*
     * Fusionner avec les variables déjà connues.
     */
    const variables =
        this.mergeVariables(
            session.variables,
            extracted.data
        );


    console.log(
        "[ScenarioManager] Variables :",
        variables.scenario
    );


    /*
     * Chercher la première donnée manquante.
     */
    const nextStep =
        await this.findNextMissingStep(
            session.scenario_id,
            variables
        );


    /*
     * Une donnée manque encore.
     */
    if (nextStep) {

        await this.saveProgress(
            session.id,
            variables,
            nextStep
        );


        return this.buildNextStepResponse(
            nextStep,
            variables
        );
    }


    /*
     * Plus aucune donnée manquante.
     */
    return this.finishScenario(
        session.id,
        variables
    );
}



    /**
     * Charger l'étape courante
     */
    static async loadCurrentStep(
        session: any
    ) {

        return this.getCurrentStep(
            session.scenario_id,
            session.step_order
        );
    }


    /**
     * Récupérer une étape précise
     *
     * PAS de random ici.
     *
     * step_order représente la position logique
     * de l'étape.
     */
    static async getCurrentStep(
        scenarioId: number,
        stepOrder: number
    ) {

        const result = await pool.query(
            `
            SELECT *
            FROM scenario_step
            WHERE scenario_id=$1
            AND step_order=$2
            LIMIT 1
            `,
            [
                scenarioId,
                stepOrder
            ]
        );

        return result.rows[0] ?? null;
    }



/**
 * Construire le schéma d'extraction
 * à partir de toutes les étapes du scénario.
 */
static buildScenarioSchema(
    steps: any[]
): FieldSchema[] {

    return steps
        .filter((step: any) => step.variable)
        .map((step: any) => {

            const field: FieldSchema = {
                champ: step.variable,
                type: step.type_champ as FieldSchema["type"],
                config: step.config ?? {}
            };

            return field;
        });
}


/**
 * Extraire les données du scénario
 *
 * Toutes les variables du scénario sont analysées
 * dans le même message.
 */
static async extractScenarioData(
    scenarioId: number,
    message: string,
    tenantData: any,
    tenantId: number
): Promise<ExtractionResult> {

    const steps =
        await this.getSteps(
            scenarioId
        );


    const schema =
        this.buildScenarioSchema(
            steps
        );


    console.log(
        "[ScenarioManager] Schema :",
        schema
    );


    if (schema.length === 0) {

        return {
            data: {},
            success: false
        };
    }


    return ExtractionService.extract(
        message,
        schema,
        tenantData,
        tenantId
    );
}



    /**
     * Fusion des variables
     */
    static mergeVariables(
        variables: any,
        newData: any
    ) {

        const scenarioVariables = {
            ...(variables?.scenario ?? {})
        };

        /*
         * On ne remplace pas inutilement les données
         * existantes par undefined/null.
         */
        for (const [key, value] of Object.entries(
            newData ?? {}
        )) {

            if (
                value !== undefined &&
                value !== null &&
                value !== ""
            ) {
                scenarioVariables[key] = value;
            }
        }

        return {
            ...(variables ?? {}),
            scenario: scenarioVariables
        };
    }



/** 
 * Trouver la prochaine étape dont la donnée manque
 */
static async findNextMissingStep(
    scenarioId: number,
    variables: any
) {

    const steps =
        await this.getSteps(
            scenarioId
        );


    const scenarioVariables =
        variables?.scenario ?? {};


    for (const step of steps) {

        /*
         * Les étapes sans variable sont généralement
         * des actions ou confirmations.
         */
        if (!step.variable) {
            return step;
        }


        const value =
            scenarioVariables[step.variable];


        const missing =
            value === undefined ||
            value === null ||
            value === "";


        if (missing) {

            console.log(
                "[ScenarioManager] Donnée manquante :",
                step.variable
            );

            return step;
        }
    }


    return null;
}



    /**
     * Sauvegarder la progression
     */
    static async saveProgress(
        sessionId: string,
        variables: any,
        nextStep: any
    ) {

        await pool.query(
            `
            UPDATE chat_session
            SET
                variables=$1,
                step_order=$2
            WHERE id=$3
            `,
            [
                variables,
                nextStep?.step_order ?? null,
                sessionId
            ]
        );
    }


    /**
     * Réponse de l'étape suivante
     */
    static buildNextStepResponse(
        nextStep: any,
        variables: any
    ) {

        return {
            finished: false,
            stepOrder: nextStep.step_order,
            variable: nextStep.variable,
            variables,

            text: replacePlaceholders(
                nextStep.question,
                variables.scenario
            )
        };
    }


    /**
     * Fin du scénario
     */
    static async finishScenario(
        sessionId: string,
        variables?: any
    ) {

        await pool.query(
            `
            UPDATE chat_session
            SET
                scenario_id=NULL,
                step_order=NULL
            WHERE id=$1
            `,
            [sessionId]
        );

        return {
            finished: true,
            variables,
            text: "Merci, votre demande est enregistrée."
        };
    }


    /**
     * Récupérer toutes les étapes
     */
    static async getSteps(
        scenarioId: number
    ) {

        const result = await pool.query(
            `
            SELECT *
            FROM scenario_step
            WHERE scenario_id=$1
            ORDER BY step_order ASC
            `,
            [scenarioId]
        );

        return result.rows;
    }


    /**
     * Groupe du scénario
     */
    static async getGroupeScenario(
        scenarioId: number
    ) {

        const result = await pool.query(
            `
            SELECT groupe_id
            FROM scenario
            WHERE id=$1
            `,
            [scenarioId]
        );

        return result.rows[0]?.groupe_id;
    }


    /**
     * Annuler un scénario
     */
    static async annuler(
        sessionId: string
    ) {

        await pool.query(
            `
            UPDATE chat_session
            SET
                scenario_id=NULL,
                step_order=NULL,
                variables=NULL
            WHERE id=$1
            `,
            [sessionId]
        );
    }


    /**
     * Action associée à un intent
     */
    static async getScenarioIntent(
        scenarioId: number,
        intentId: number
    ) {

        const result = await pool.query(
            `
            SELECT action
            FROM scenario_intent
            WHERE scenario_id=$1
            AND intent_id=$2
            `,
            [
                scenarioId,
                intentId
            ]
        );

        return result.rows[0] ?? null;
    }
}

