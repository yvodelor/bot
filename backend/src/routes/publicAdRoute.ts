import { Router } from "express";
import { publicAdController } from "../controllers/publicAdController";

const router = Router();


// IMPORTANT : /by doit être avant /:id
router.get(
    "/public/ad/active",
    publicAdController.getActiveAds
);


export default router;