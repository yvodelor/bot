import Fuse from "fuse.js";

export type IntentRule = {
    id: number;
    nom: string;
    keywords: string;
    scenario_id: string;
    groupe_id?: string;
};


function cleanText(text: string): string {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}



export const detectIntent = (
    text: string,
    intents: IntentRule[],
): IntentRule | null => {

    const normalized = cleanText(text);


    const keywords = intents.flatMap(intent =>
        intent.keywords
            .split(",")
            .map(keyword => ({
                keyword: cleanText(keyword),
                intent
            }))
    );


    const fuse = new Fuse(keywords, {
        keys: ["keyword"],
        threshold: 0.35,
        includeScore: true,
        ignoreLocation: true
    });


    const result = fuse.search(normalized);


    const best = result[0];


    if (!best) {
        return null;
    }


    if (
        best.score !== undefined &&
        best.score <= 0.35
    ) {
        return best.item.intent;
    }


    return null;
};