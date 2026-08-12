import type { Request, Response, NextFunction } from "express";
import { businessService } from "../services/businessService";


export const publicBusinessController = {



    // GET /public/business/by?field=slug&value=xxx
    getByField: async ( req: Request, res: Response,  next: NextFunction  ) => {

        try {

            const {
                field,
                value
            } = req.query;

           
            console.log(field, value)
            if (!field || !value) {

                return res.status(400).json({
                    success:false,
                    message:"field et value sont obligatoires"
                });

            }



            const businesses =
                await businessService.getByField(
                    field as string,
                    value as string,
                    {
                        enableAccess:false
                    }
                );

            

            if (!businesses || businesses.length === 0) {

                return res.status(404).json({
                    success:false,
                    message:"Entreprise introuvable"
                });

            }



            const business = businesses[0];
        
            if (!business) {
                return res.status(404).json({
                    success: false,
                    message: "Entreprise introuvable"
                });
            }
            
            res.json({
                success:true,
                data:{
                    id: business.id,
                    name: business.name,
                    phone: business.phone,
                    wathsapp: business.wathsapp,
                    email: business.email,
                    website: business.website,
                    address: business.address,
                    horaire: business.horaire,
                    description: business.description,
                    agent_name: business.agent_name,
                    infos: business.infos,
                    slug: business.slug
                }
            });

        

        } catch(error) {

            next(error);

        }

    },




    // GET /public/business/:id
    getById: async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const id = Number(req.params.id);


            if (isNaN(id)) {

                return res.status(400).json({
                    success:false,
                    message:"ID invalide"
                });

            }


            const business =
                await businessService.getById(
                    id,
                    {
                        enableAccess:false
                    }
                );


            if (!business) {

                return res.status(404).json({
                    success:false,
                    message:"Entreprise introuvable"
                });

            }

            return business
            /*
            res.json({
                success:true,
                data:{
                    id: business.id,
                    name: business.name,
                    phone: business.phone,
                    wathsapp: business.wathsapp,
                    email: business.email,
                    website: business.website,
                    address: business.address,
                    horaire: business.horaire,
                    description: business.description,
                    agent_name: business.agent_name,
                    infos: business.infos,
                    slug: business.slug
                }
            });
            */

        } catch(error) {

            next(error);

        }

    },





};