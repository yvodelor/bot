import { lazy } from "react";
import type { ReactElement } from "react";

export interface AppRoute {
    path: string;
    element: ReactElement;
    protected?: boolean;
}

import Intents from "./pages/admin/intent";
import IntentExCreate from "./pages/admin/intentexmple/IntentExCreate";
import IntentExPage from "./pages/admin/intentexmple/index.tsx";
import IntentCreate from "./pages/admin/intent/intentCreate";
import Activites from "./pages/admin/activite";
import ActiviteCreate from "./pages/admin/activite/ActiviteCreate";
import Scenarios from "./pages/admin/scenario";
import ScenarioCreate from "./pages/admin/scenario/ScenarioCreate";
import ScenarioSteps from "./pages/admin/scenariostep";
import ScenarioStepCreate from "./pages/admin/scenariostep/ScenarioStep";

//==================================
// TYPES
// ======================================================




// ======================================================
// PAGES
// ======================================================

const HomePage = lazy(() => import("./pages/Home"));
const Cgu = lazy(() => import("./pages/Cgu"));
const DeleteData = lazy(() => import("./pages/DeleteData"));
const PolicyPrivacy = lazy(() => import("./pages/PolicyPrivacy"));


/* Auth */
const Login = lazy(() => import("./pages/auth/Login"));
const Logout = lazy(() => import("./pages/auth/Logout"));
const Profile = lazy(() => import("./pages/auth/Profile"));
const Register = lazy(() => import("./pages/auth/Register"));
const PasswordForgot = lazy(() => import("./pages/auth/Password-forgot"));


/* Dashboard */
const Dashboard = lazy(() => import("./pages/dash/Dashboard"));


/* Chatbot */

const ChatPage = lazy(() => import("./pages/chatbot/Chat"));




/* Business */
const BusinessPage = lazy(() => import("./pages/dash/business/"));
const BusinessCreate = lazy(() => import("./pages/dash/business/BusinessCreate"));


/* Product */
const ProduitPage = lazy(() => import("./pages/dash/produit"));
const ProduitCreate = lazy(() => import("./pages/dash/produit/ProduitCreate"));


/* FAQ */
const Faq = lazy(() => import("./pages/dash/faq/"));
const FaqCreate = lazy(() => import("./pages/dash/faq/FaqCreate"));


/* Response */
const ResponseBase = lazy(() => import("./pages/admin/responsebase"));
const ResponseBaseCreate = lazy(() =>
    import("./pages/admin/responsebase/ResponseBase")
);


/* Ads */
const Ad = lazy(() => import("./pages/admin/ad"));
const AdCreate = lazy(() => import("./pages/admin/ad/adCreate"));


/* ScenarioIntent */
const ScenarioIntent = lazy(() =>
    import("./pages/admin/scenariointent")
);

const ScenarioIntentCreate = lazy(() =>
    import("./pages/admin/scenariointent/ScenarioIntentCreate")
);


// ======================================================
// ROUTES
// ======================================================

const appRoutes: AppRoute[] = [

    // ==================================================
    // PUBLIC
    // ==================================================

    { path: "/", element: <HomePage /> },
    { path: "/cgu", element: <Cgu /> },
    { path: "/deleteData", element: <DeleteData /> },
    { path: "/PolicyPrivacy", element: <PolicyPrivacy /> },


    // ==================================================
    // AUTH
    // ==================================================

    { path: "/login", element: <Login /> },
    { path: "/logout", element: <Logout /> },
    { path: "/register", element: <Register /> },
    { path: "/password-forgot", element: <PasswordForgot /> },

    {
        path: "/profile",
        element: <Profile />,
        protected: true
    },


    // ==================================================
    // DASHBOARD
    // ==================================================

    {
        path: "/dashboard",
        element: <Dashboard />,
        protected: true
    },


    // ==================================================
    // BUSINESS
    // ==================================================

    {
        path: "/businesses",
        element: <BusinessPage />,
        protected: true
    },

    {
        path: "/business",
        element: <BusinessCreate />,
        protected: true
    },

    {
        path: "/business/:id",
        element: <BusinessCreate />,
        protected: true
    },

    {
        path: "/business/bot/:botId",
        element: <BusinessCreate />,
        protected: true
    },


    // ==================================================
    // PRODUITS
    // ==================================================

    {
        path: "/produits/business/:businessId",
        element: <ProduitPage />,
        protected: true
    },

    {
        path: "/produit/business/:businessId",
        element: <ProduitCreate />,
        protected: true
    },

    {
        path: "/produit/:id/business/:businessId",
        element: <ProduitCreate />,
        protected: true
    },

 

    // ==================================================
    // FAQ
    // ==================================================

    {
        path: "/faqs/business/:businessId",
        element: <Faq />,
        protected: true
    },

    {
        path: "/faq/:id/business/:businessId",
        element: <FaqCreate />,
        protected: true
    },

    {
        path: "/faq/:id/business/:businessId",
        element: <FaqCreate />,
        protected: true
    },


    // ==================================================
    // ADMIN
    // ==================================================

    {
        path: "/admin/response_bases/",
        element: <ResponseBase />,
        protected: true
    },

    {
        path: "/admin/response_base",
        element: <ResponseBaseCreate />,
        protected: true
    },

    {
        path: "/admin/response_base/:id",
        element: <ResponseBaseCreate />,
        protected: true
    },


    {
        path: "/admin/intents",
        element: <Intents />,
        protected: true
    },

    {
        path: "/admin/intent",
        element: <IntentCreate />,
        protected: true
    },

    {
        path: "/admin/intent/:id",
        element: <IntentCreate />,
        protected: true
    },


    {
        path: "/admin/intent/exemples",
        element: <IntentExPage />,
        protected: true
    },

    {
        path: "/admin/intent/exemple/:id",
        element: <IntentExCreate />,
        protected: true
    },

    {
        path: "/admin/intent/exemple",
        element: <IntentExCreate />,
        protected: true
    },


    {
        path: "/admin/activites",
        element: <Activites />,
        protected: true
    },

    {
        path: "/admin/activite",
        element: <ActiviteCreate />,
        protected: true
    },

    {
        path: "/admin/activite/:id",
        element: <ActiviteCreate />,
        protected: true
    },


    // ==================================================
    // SCENARIOS
    // ==================================================

    {
        path: "/admin/scenarios",
        element: <Scenarios />,
        protected: true
    },

    {
        path: "/admin/scenario",
        element: <ScenarioCreate />,
        protected: true
    },

    {
        path: "/admin/scenario/:id",
        element: <ScenarioCreate />,
        protected: true
    },


    {
        path: "/admin/scenario_steps",
        element: <ScenarioSteps />,
        protected: true
    },

    {
        path: "/admin/scenario_steps/scenario/:scenarioId",
        element: <ScenarioStepCreate />,
        protected: true
    },


    {
        path: "/admin/scenario_step",
        element: <ScenarioStepCreate />,
        protected: true
    },

    {
        path: "/admin/scenario_step/:id",
        element: <ScenarioStepCreate />,
        protected: true
    },


    // ==================================================
    // ADS
    // ==================================================

    {
        path: "/admin/ads",
        element: <Ad />,
        protected: true
    },

    {
        path: "/admin/ad",
        element: <AdCreate />,
        protected: true
    },

    {
        path: "/admin/ad/:id",
        element: <AdCreate />,
        protected: true
    },


    // ==================================================
    // SCENARIO INTENT
    // ==================================================

    {
        path: "/admin/scenario_intents",
        element: <ScenarioIntent />,
        protected: true
    },

    {
        path: "/admin/scenario_intent",
        element: <ScenarioIntentCreate />,
        protected: true
    },

    {
        path: "/admin/scenario_intent/:id",
        element: <ScenarioIntentCreate />,
        protected: true
    },


    // ==================================================
    // CHAT
    // ==================================================
    {
        path: "/chatbot/:slugBusiness",
        element: <ChatPage />
    }

];


export default appRoutes;