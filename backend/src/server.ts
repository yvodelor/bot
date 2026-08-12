import app from "./app"
import { initFuseGlobal } from "./chatbot/entityService";

import dotenv from "dotenv";

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;

async function startServer() {
    try {
        await initFuseGlobal();

        app.listen(PORT, () => {
            console.log(`Serveur lancé sur le port ${PORT}`);
        });

    } catch (error) {
        console.error("Erreur au démarrage du serveur :", error);
        process.exit(1);
    }
}

startServer();