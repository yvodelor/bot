
import fs from "fs";
import path from "path";

// ======================================================
// CHARGEMENT DES STOPWORDS
// ======================================================

const stopwordsArray: string[] = JSON.parse(
    fs.readFileSync(
        path.join(__dirname, "../types/stopwords.fr.json"),
        "utf-8"
    )
);

const STOPWORDS = new Set<string>(
    stopwordsArray.map((mot: string) => mot.toLowerCase())
);


// ======================================================
// NETTOYAGE DU MESSAGE
// ======================================================

export function cleanMessage(message: string): string {

    return message
        .toLowerCase()

        // é -> e
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")

        // Enlever ?, !, ', etc.
        .replace(/[^\w\s]/g, " ")

        // 20k -> 20000
        .replace(
            /(\d+)\s*k/g,
            (_match: string, p1: string) =>
                String(Number(p1) * 1000)
        )

        // Séparer les mots
        .split(/\s+/)

        // Supprimer les stopwords
        .filter(
            (mot: string) =>
                mot.length > 1 &&
                !STOPWORDS.has(mot)
        )

        .join(" ")

        // Nettoyer les espaces multiples
        .replace(/\s+/g, " ")

        .trim();
}

