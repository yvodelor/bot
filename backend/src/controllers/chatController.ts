import type { Request, Response } from "express";

import { ChatEngine } from "../services/ChatEngine";



export const chatController = async (
    req: Request,
    res: Response
) => {


    try {


        const { tenantId } = req.params;
        console.log('tenant', req.params)

        const {
            message,
            sessionId
        } = req.body;



        // Validation

        if(!tenantId){

            return res.status(400).json({

                message:"TenantId requis"

            });

        }

        if(!message){

            return res.status(400).json({

                message:"Message requis"

            });

        }




        // Appel moteur conversationnel

        const result =
        await ChatEngine.process({

            tenantId:Number(tenantId),

            sessionId,

            message

        });





        return res.json(result);



    }
    catch(error){


        console.error(
            "ChatController error:",
            error
        );



        return res.status(500).json({

            message:
            "Erreur serveur"

        });


    }


};