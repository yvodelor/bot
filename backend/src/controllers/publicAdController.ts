import type { Request, Response, NextFunction } from "express";
import { adService } from "../services/adService";


export const publicAdController = {


    getActiveAds: async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const tenantId = Number(
                req.params.tenantId
            );


            if (!tenantId) {
                return res.status(400).json({
                    success:false,
                    message:"Tenant invalide"
                });
            }


            const ads =
                await adService.getActiveAds();


            res.json({
                success:true,
                data:ads
            });


        } catch(error){

            next(error);

        }

    }

};