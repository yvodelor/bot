import { stopwordsFr } from "../utils/stopwords.fr";

// ======================================================
// CHARGEMENT DES STOPWORDS
// ======================================================

const stopwords = new Set(stopwordsFr);

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
                !stopwords.has(mot)
        )

        .join(" ")

        // Nettoyer les espaces multiples
        .replace(/\s+/g, " ")
        .trim();
}