
export type IntentType =
  | "help"
  | "request"
  | "search"
  | "question"
  | "repeat"
  | "greeting"
  | "thanks"
  | "goodbye"
  | "affirmative"
  | "negative"
 ;


const intents = {


    
    affirmative : [
    "oui",
    "ouais",
    "ouiii",
    "ok",
    "okay",
    "okey",
    "d'accord",
    "daccord",
    "dac",
    "bien",
    "parfait",
    "exact",
    "exactement",
    "correct",
    "c'est ça",
    "cest ça",
    "tout à fait",
    "absolument",
    "certainement",
    "volontiers",
    "yes",
    "yep",
    "yeah",
    "sure",
    "go",
    "continue",
    "vas-y",
    "faites-le",
    "je confirme",
    "confirmé",
    "confirmee"
    ],
    negative : [
    "non",
    "no",
    "nop",
    "nope",
    "jamais",
    "pas du tout",
    "aucun",
    "aucune",
    "impossible",
    "faux",
    "incorrect",
    "je refuse",
    "annuler",
    "stop",
    "arrete",
    "arrête",
    "laisse",
    "pas maintenant",
    "plus tard",
    "ne continue pas"
    ],

    thanks : [
    "merci",
    "merci beaucoup",
    "grand merci",
    "thanks",
    "thank you",
    "cool merci",
    "super merci",
    "parfait merci"
    ],

    greeting: [
    "bonjour",
    "salut",
    "hello",
    "hi",
    "hey",
    "bonsoir",
    "coucou",
    "yo",
    "bjr",
    "slt"
    ],

    goodbye: [
    "au revoir",
    "aurevoir",
    "bye",
    "goodbye",
    "à bientôt",
    "a bientot",
    "à plus",
    "a plus",
    "ciao",
    "bonne journée",
    "bonne soiree",
    "bonne soirée"
    ],

    neutral : [
    "hmm",
    "hum",
    "d'accord",
    "ok",
    "je vois",
    "compris",
    "noté",
    "note",
    "entendu",
    "bien reçu",
    "reçu",
    "vu",
    "ah",
    "oh",
    "hein",
    "hmmm"
    ],

    repeat: [
    "quoi",
    "pardon",
    "répète",
    "repete",
    "je n'ai pas compris",
    "explique",
    "plus de détails",
    "encore",
    "comment",
    "pourquoi"
    ],

    help: [
        "aide",
        "peux-tu m'aider",
        "aidez-moi",
        "help",
        "j'ai besoin d'aide"
    ],

    search: [
        "je cherche",
        "je veux trouver",
        "montre-moi",
        "trouve",
        "je voudrais"
    ],

    question: [
        "comment",
        "explique",
        "pourquoi",
        "c'est quoi",
        "qu'est-ce que"
    ],

    request: [
        "je veux",
        "je voudrais",
        "donne-moi",
        "envoie-moi"
    ]

};


export default intents;