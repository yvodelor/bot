import { Router } from "express";
import { publicAdController } from "../controllers/publicAdController";
import { publicBusinessController } from "../controllers/publicBusinessController";

const routerPublic = Router();



// Business par champ (slug, etc.)
routerPublic.get( 
    "/public/business/by", publicBusinessController.getByField
);


// Business par ID
routerPublic.get(
    "/public/business/:id",
    publicBusinessController.getById
);

// Publicités actives
routerPublic.get(
    "/public/chatbots",
    publicBusinessController.getPublicChatbot
);

// Publicités actives
routerPublic.get(
    "/public/ad/active",
    publicAdController.getActiveAds
);



export default routerPublic;