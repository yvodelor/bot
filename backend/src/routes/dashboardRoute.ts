import { Router } from "express";
import { DashboardController } from "../controllers/dashboardController";
import { authMiddleware } from "../middleware/authMiddleware";

const dashRouter = Router();

dashRouter.get(
  "/",
  authMiddleware,
  DashboardController.getDashboard
);

export default dashRouter;