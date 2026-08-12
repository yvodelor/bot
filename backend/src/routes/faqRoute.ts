import { createCrudRoutes } from "./baseRoute";
import { faqController } from "../controllers/faqController";

export default createCrudRoutes( faqController, {
    protectedRoutes: [ 'delete']
})