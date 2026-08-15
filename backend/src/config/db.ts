import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is missing ❌");
}

try {
    const url = new URL(DATABASE_URL);

    console.log("[DB] User:", url.username);
    console.log("[DB] Host:", url.hostname);
    console.log("[DB] Port:", url.port);
    console.log("[DB] Database:", url.pathname);
    console.log("[DB] Password présente:", url.password.length > 0);
} catch (error) {
    console.error("[DB] DATABASE_URL invalide ❌");
    throw error;
}

export const pool = new Pool({
    connectionString: DATABASE_URL,
});

pool.query("SELECT 1")
    .then(() => {
        console.log("Base de donnée connectée avec succès ✅");
    })
    .catch((err) => {
        console.error("Erreur de connexion DB ❌", err.message);
        process.exit(1);
    });