import { Router } from "express";
import { chatController } from "../controllers/chatController";

const chatRouter = Router();

chatRouter.post("/chat/:tenantId", chatController);

export default chatRouter;