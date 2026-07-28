import { pool } from "../config/db";


export class ScenarioManager {


    /**
     * Démarre un scénario
     */
    static async start(
        sessionId:string,
        scenarioId:number
    ){

        await pool.query( ` UPDATE chat_session  SET scenario_id=$1, scenario_step=1
            WHERE id=$2 `,
            [ scenarioId, sessionId ]
        );


        return this.getCurrentStep(
            scenarioId,
            1
        );
    }




    /**
     * Récupère l'étape actuelle
     */
    static async getCurrentStep(
        scenarioId:number,
        step:number
    ){

        const result =
            await pool.query(
            `
            SELECT *
            FROM scenario_step
            WHERE scenario_id=$1
            AND step_order=$2
            `,
            [ scenarioId, step ]);


        return result.rows[0] ?? null;
    }

    /**
     * 
     */
    
    static hasScenario(
        session:any
    ):boolean {

        return (
            session.scenario_id !== null
            &&
            session.scenario_id !== undefined
            &&
            session.step_ordre !== null
        );

    }


    /**
     * Traite la réponse utilisateur
     */
    static async handle(
        session:any,
        message:string
    ){


        const step =
            await this.getCurrentStep(
                session.scenario_id,
                session.step_ordre
            );


        if(!step){

            return {
                finished:true,
                text:"Votre demande est terminée."
            };

        }



        /*
          Exemple :
          step.variable_name = produit

          message = "Chaise"
        */

        const variables =
            session.variables ?? {};


        variables[step.variable_name] =
            message;



        await pool.query(
            `
            UPDATE chat_session
            SET
                variables=$1,
                scenario_step=scenario_step+1
            WHERE id=$2
            `,
            [
                variables,
                session.id
            ]
        );



        const nextStep =
            await this.getCurrentStep(
                session.scenario_id,
                session.step_ordre + 1
            );



        if(!nextStep){

            await pool.query(
                `
                UPDATE chat_session
                SET scenario_id=NULL,
                    step_ordre=NULL
                WHERE id=$1
                `,
                [
                    session.id
                ]
            );


            return {
                finished:true,
                variables,
                text:"Merci, votre demande est enregistrée."
            };

        }



        return {

            finished:false,

            variables,

            text:nextStep.question

        };

    }

}