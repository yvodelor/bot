import { lazy, Suspense} from "react"

import Intents from "./pages/admin/intent";
import IntentExCreate from "./pages/admin/intentexmple/IntentExCreate";
import IntentExPage from "./pages/admin/intentexmple/index.tsx";
import IntentCreate from "./pages/admin/intent/intentCreate";
import Activites from "./pages/admin/activite";
import ActiviteCreate from "./pages/admin/activite/ActiviteCreate";
import Scenarios from "./pages/admin/scenario";
import ScenarioCreate from "./pages/admin/scenario/ScenarioCreate";
import ScenarioStep from "./pages/admin/scenariostep/";
import ScenarioStepCreate from "./pages/admin/scenariostep/ScenarioStep";

//import ProtectedRoute from "./components/ProtectedRoute";

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

/* Tableau de bord */ 
const Dashboard = lazy(() => import ("./pages/dash/Dashboard"));


/* Chatbot */
const Bots = lazy(() => import("./pages/chatbot"));
//const ChatWidget = lazy(() => import("./components/ChatWidget"));
const ChatPage = lazy(() => import("./pages/chatbot/Chat"));
   



/* Agent */
const AgentPage = lazy(() => import("./pages/dash/agent"));
const AgentCreate = lazy(() => import("./pages/dash/agent/AgentCreate"));

/* Business */
const BusinessPage = lazy(() => import("./pages/dash/business/"));
const BusinessCreate = lazy(() => import("./pages/dash/business/BusinessCreate"));
const Knowledge = lazy(() => import("./pages/dash/business/Knowledge"));



/* Product */
const ProduitPage = lazy(() => import("./pages/dash/produit"));
const ProduitCreate = lazy(() => import("./pages/dash/produit/ProduitCreate"));

const FaqCustomtPage = lazy(() =>import("./pages/dash/faqcustom") );
const FaqCustom = lazy(() => import("./pages/dash/faqcustom/FaqCustom"));

const FaqDefaultPage = lazy(() =>import("./pages/admin/faqdefault") );
const FaqDefault = lazy(() => import("./pages/admin/faqdefault/FaqDefault"));


const ResponseBase = lazy(() => import("./pages/admin/responsebase"));
const ResponseBaseCreate = lazy(() => import( "./pages/admin/responsebase/ResponseBase"));







const appRoutes = [
  
  // Liens utiles
  { path: "/", element: <HomePage /> },
  { path: "/cgu", element: <Cgu /> },
  { path: "/deleteData", element: <DeleteData /> },
  { path: "/PolicyPrivacy", element: <PolicyPrivacy /> },

  // Liens Auth
  { path: "/login", element: <Login /> },
  { path: "/logout", element: <Logout />},
  { path: "/register", element: <Register /> },
  { path: "/password-forgot", element: <PasswordForgot /> },
  { path: "/profile", element: <Profile /> },

  // Liens Dash
  { path: "/dashboard", element: <Dashboard /> },

  { path: "/agents", element: <AgentPage /> },
  { path: "/agent", element: <AgentCreate /> },
  { path: "/agent/:id", element: <AgentCreate /> },

  { path: "/businesses", element: <BusinessPage /> },
  { path: "/business", element: <BusinessCreate /> },
  { path: "/business/:id", element: <BusinessCreate /> },
  { path: "/business/bot/:botId", element: <BusinessCreate /> },

  { path: "/produits", element: <ProduitPage /> },
  { path: "/produit", element: <ProduitCreate /> },
  { path: "/produit/:id", element: <ProduitCreate /> },

  { path: "/faq/business/:businessId", element: <Knowledge /> },
  { path: "/faq_customs", element: <FaqCustomtPage /> },
  { path: "/faq_custom", element: <FaqCustom /> },
  { path: "/faq_custom/business/:businessId", element: <FaqCustom /> },
  { path: "/faq_custom/:id", element: <FaqCustom /> },


  // Liens Admin
  { path: "/admin/faq_defaults/", element: <FaqDefaultPage /> },
  { path: "/admin/faq_default/", element: <FaqDefault /> },
  { path: "/admin/faq_default/:id", element: <FaqDefault /> },

  { path: "/admin/response_bases/", element: <ResponseBase /> },
  { path: "/admin/response_base", element: <ResponseBaseCreate /> },
  { path: "/admin/response_base/:id", element: <ResponseBaseCreate /> },

  { path: "/admin/intents", element: <Intents /> },
  { path: "/admin/intent", element: <IntentCreate /> },
  { path: "/admin/intent/:id", element: <IntentCreate /> },

  { path: "/admin/intent/exemples", element: <IntentExPage />},
  { path: "/admin/intent/exemple/:id", element: <IntentExCreate />},
  { path: "/admin/intent/exemple", element: <IntentExCreate />},

  { path: "/admin/activites", element: <Activites /> },
  { path: "/admin/activite", element: <ActiviteCreate /> },
  { path: "/admin/activite/:id", element: <ActiviteCreate /> },

  { path: "/admin/scenarios", element: <Scenarios /> },
  { path: "/admin/scenario", element: <ScenarioCreate /> },
  { path: "/admin/scenario/:id", element: <ScenarioCreate /> },

  { path: "/admin/scenario_steps", element: <ScenarioStep /> },
  { path: "/admin/scenario_steps/scenario/:scenarioId", element: <ScenarioStep /> },

  { path: "/admin/scenario_step", element: <ScenarioStepCreate /> },
  { path: "/admin/scenario_step/:id", element: <ScenarioStepCreate /> },

  { path: "/product/business/:businessId", element: <ProduitPage /> },


  // Lien Chat
  { path: "/chat", element: <Bots /> },
 
  { path: "/chatbot/:slugBusiness", element: <ChatPage /> },  

];

export default appRoutes