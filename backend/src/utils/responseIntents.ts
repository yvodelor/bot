export type IntentType =
  | "greeting"
  | "thanks"
  | "goodbye"
  | "search"
  | "request"
  | "question"
  | "help"
  | "repeat"
  | "affirmative"
  | "negative"
 ;

/**
 * Fonctions de réponse par intent
 */
export const responseIntent: Record<
  IntentType,
  (message?: string) => string
> = {
  greeting: () => "Bonjour 👋 comment puis-je vous aider ?",

  thanks: () => "Avec plaisir 😊",

  goodbye: () => "Au revoir 👋",

  search: (message = "") => {
    const clean = message
      .toLowerCase()
      .replace("je cherche", "")
      .replace("montre-moi", "")
      .trim();

    return `🔍 Je recherche : "${clean}"`;
  },

  request: (message = "") =>
    `👍 Très bien, je traite votre demande : "${message}"`,

  question: () => "🤔 Voici la réponse à votre question :",

  help: () => "Je suis là pour vous aider 👍",

  repeat: () => "Pouvez-vous reformuler ?",

  affirmative: () => "👍 D'accord",

  negative: () => "Très bien, compris",

};