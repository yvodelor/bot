// Choix aléatoire
export function pickRandom<T>(arr: T[]): T | null {
  if (!arr || arr.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex] ?? null;
}

// Compteur de mots
export function wordCount(message: string): number {
  return message.trim() === "" ? 0 : message.trim().split(/\s+/).length;
}
/*

// Variables type
export type Variables = Record<string, string | number>;

// Template engine simple
export function replacePlaceholders(
  text: string,
  variables: Variables
): string {
  return text.replace(/\{(\w+)\}/g, (_, key) => {
    return variables[key]?.toString() ?? `{${key}}`;
  });
}
*/


export type Variables = Record<string, string | number | null | undefined>;

/**
 * Remplace les variables dans un texte
 *
 * Exemple :
 * "Bonjour {user_name}, bienvenue chez {company_name}"
 *
 * variables :
 * {
 *   user_name: "Jean"
 * }
 *
 * defaults :
 * {
 *   company_name: "ABC SARL"
 * }
 *
 * Résultat :
 * "Bonjour Jean, bienvenue chez ABC SARL"
 */

export const replacePlaceholders = (
    text: string,
    variables: Variables = {},
    defaults: Variables = {}
): string => {

    return text.replace(
        /\{([^}]+)\}/g,
        (_, key: string) => {

            // Priorité :
            // 1. variable session
            // 2. valeur par défaut
            // 3. vide

            const value =
                variables[key] ??
                defaults[key] ??
                "";

            return String(value).trim();
        }
    );
};



export function formatListeProduits(produits: any[]){ 
  let  message = '\n\n';

  produits.forEach((p, i) => {
    message += `*${i+1}. ${p.name} \n `;
    message += `Prix: ${p.prix} FCFA\n\n `;
  });

  message += '\n\n';
  return message;
}


function escapeMarkdown(value: string) {
  return value.replace(/\|/g, "\\|");
}

export function formatTableauProduits(produits: any[]) {
  let msg = `\n\n`;

  msg += `| Num | Produit | Prix |\n`;
  msg += `| --- | --- | --- |\n`;

  produits.forEach((p, i) => {
    msg += `| ${i + 1} | ${escapeMarkdown(p.name)} | ${p.prix} FCFA |\n`;
  });
  msg += `\n\n`;
  return msg;
}