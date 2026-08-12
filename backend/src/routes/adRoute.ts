import { createCrudRoutes } from "./baseRoute";
import { adController } from "../controllers/adController";
import { uploadAd } from "../config/multer";

export default createCrudRoutes( adController, {
    protectedRoutes: ['delete'],
    upload: uploadAd.single("image"),

    customRoutes: (router) => {

        router.get(
            "/active",
            adController.getActiveAds
        );

    }
})

