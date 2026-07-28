
const stopWords = ["le", "la", "les", "de", "de", "du", "des", "un", "une", "et", 
                  "a", "au", "aux", "et", "ou", "est", "sont", "que", "qui", "pour", "sur",
                "par", "à", "en", "c", "j", "l", "t", "s", "n", "m", "qu"];

export function normalizeText(text: string): string {
    return text
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/['']/g, " ")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .split(" ")
    .filter(word => !stopWords.includes(word))
    .join()
    .trim()
}