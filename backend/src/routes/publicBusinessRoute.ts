import { Router } from "express";
import { publicBusinessController } from "../controllers/publicBusinessController";

const router = Router();


// IMPORTANT : /by doit être avant /:id
router.get(
    "/public/business/by",
    publicBusinessController.getByField
);


// Recherche par ID
router.get(
    "/public/business/:id",
    publicBusinessController.getById
);

router.get(
    "/public/chatbots",
    publicBusinessController.getPublicChatbot
);


export default router;