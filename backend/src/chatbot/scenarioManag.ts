
export class Scenario
{
    //Récupération du scenario en cours
    static async function start(sessionId: string, scenarioId: number, scenarioStepId: number = 1 ){
        // Mettre à jour le chat_session

        /**
         * Démarre un scénario
         */
       

        await pool.query( ` UPDATE chat_session  SET scenario_id=$1, scenario_step=1
            WHERE id=$2 `,
            [ scenarioId, scenarioStepId, sessionId ]
        );


        return this.getCurrentStep(
            scenarioId,
            1
        );
        
    }
    
}

