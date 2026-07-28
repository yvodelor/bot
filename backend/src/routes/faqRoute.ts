import { createCrudRoutes } from "./baseRoute";
import { faqDefaultController } from "../controllers/faqDefaultController";

export default createCrudRoutes( faqDefaultController, {
    protectedRoutes: [ 'delete']
})