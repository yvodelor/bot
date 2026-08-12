const stopWords = [
    "le",
    "la",
    "les",
    "de",
    "du",
    "des",
    "un",
    "une",
    "et",
    "a",
    "au",
    "aux",
    "ou",
    "est",
    "sont",
    "que",
    "qui",
    "pour",
    "sur",
    "par",
    "à",
    "en"
];


export function normalizeText(text:string):string {

    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g,"")
        .replace(/['’]/g," ")
        .replace(/[^\w\s]/g," ")
        .replace(/\s+/g," ")
        .trim()
        .split(" ")
        .filter(word => 
            word.length > 1 &&
            !stopWords.includes(word)
        )
        .join(" ");

}