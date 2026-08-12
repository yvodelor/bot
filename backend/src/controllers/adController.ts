import { Request, Response } from "express";
import { adService } from "../services/adService";
import { createBaseController } from "./baseController";


const validateCreate = (data:any) => {

    if(!data.title || data.title.trim().length < 3) {
        return "le titre min 3 caractères";
    }

    return null;
};



export const adController = {

    ...createBaseController(adService, {
        create: validateCreate,
        update: validateCreate
    }),



    getActiveAds: async (
        req: Request,
        res: Response
    ) => {

        try {

            const ads = await adService.getActiveAds();


            res.json(ads);


        } catch(error) {

            console.error(error);

            res.status(500).json({
                message:"Erreur récupération publicités"
            });

        }
    }

};