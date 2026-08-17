import Fuse from "fuse.js";

import { produitService } from "../services/produitService";
import { cleanMessage } from "./cleanMessage";
import { entitiesData } from "../utils/entities.fr";

// ======================================================
// TYPES
// ======================================================

interface ProduitBDD {
    id: number;
    name: string;
    business_id: number | null;
}

interface ProduitFuse {
    synonyme: string;
    nom: string;
    id: number;
    business_id: number | null;
}

interface EntityFuse {
    synonyme: string;
    nom: string;
}

type FuseProduit = Fuse<ProduitFuse>;
type FuseEntity = Fuse<EntityFuse>;

type FuseResult<T> = Fuse.FuseResult<T>;

// ======================================================
// INDEX FUSE
// ======================================================

// Un index par business
const fuseBusinesses = new Map<string, FuseProduit>();

// Produits globaux
let fuseGlobal: FuseProduit | null = null;

// Entités JSON
let fuseEntities: FuseEntity | null = null;

let isLoading = false;

// ======================================================
// OPTIONS FUSE
// ======================================================

const fuseOptions: Fuse.IFuseOptions<ProduitFuse> = {
    keys: ["synonyme"],
    threshold: 0.4,
    includeScore: true,
    minMatchCharLength: 2,
    ignoreLocation: true
};

// ======================================================
// INITIALISATION
// ======================================================

export async function initFuseGlobal(): Promise<void> {
    if (isLoading) {
        return;
    }

    isLoading = true;

    try {
        console.log("[Fuse] Chargement en cours...");

        // ==================================================
        // 1. PRODUITS BDD
        // ==================================================

        const produits = await produitService.getAll();

        console.log(`[Fuse] ${produits.length} produits récupérés`);

        const produitsParBusiness = new Map<string, ProduitFuse[]>();
        const produitsGlobaux: ProduitFuse[] = [];

        // ==================================================
        // 2. INDEXER LES PRODUITS BDD
        // ==================================================

        for (const produit of produits) {
            if (!produit.name) {
                continue;
            }

            const entree: ProduitFuse = {
                synonyme: cleanMessage(produit.name),
                nom: produit.name,
                id: produit.id,
                business_id:
                    produit.business_id === null ||
                    produit.business_id === undefined
                        ? null
                        : Number(produit.business_id)
            };

            // ==================================================
            // 1. TOUS LES PRODUITS → FUSE GLOBAL
            // ==================================================

            produitsGlobaux.push(entree);

            // ==================================================
            // 2. PRODUITS DU BUSINESS → FUSE BUSINESS
            // ==================================================

            if (
                produit.business_id !== null &&
                produit.business_id !== undefined
            ) {
                const businessId = String(produit.business_id);

                if (!produitsParBusiness.has(businessId)) {
                    produitsParBusiness.set(businessId, []);
                }

                produitsParBusiness
                    .get(businessId)!
                    .push(entree);
            }
        }

        // ==================================================
        // 3. FUSE DES BUSINESSES
        // ==================================================

        fuseBusinesses.clear();

        for (const [businessId, listeProduits] of produitsParBusiness) {
            const fuse = new Fuse<ProduitFuse>(
                listeProduits,
                fuseOptions
            );

            fuseBusinesses.set(businessId, fuse);

            console.log(
                `[Fuse] Business ${businessId} : ` +
                `${listeProduits.length} produits`
            );
        }

        // ==================================================
        // 4. FUSE GLOBAL
        // ==================================================

        if (produitsGlobaux.length > 0) {
            fuseGlobal = new Fuse<ProduitFuse>(
                produitsGlobaux,
                fuseOptions
            );
        } else {
            fuseGlobal = null;
        }

        console.log(
            `[Fuse] Global : ${produitsGlobaux.length} produits`
        );

        // ==================================================
        // 5. ENTITIES.FR.JSON
        // ==================================================

      

        const listeEntities: EntityFuse[] = [];



        for (const categorie of entitiesData.categories || []) {
            for (const produit of categorie.produits || []) {
                const synonymes: readonly string[] =  produit.synonymes || [];

                // Nom officiel
                if (produit.nom) {
                    listeEntities.push({
                        synonyme: cleanMessage(produit.nom),
                        nom: produit.nom
                    });
                }

                // Synonymes
                for (const synonyme of synonymes) {
                    if (!synonyme) {
                        continue;
                    }

                    listeEntities.push({
                        synonyme: cleanMessage(synonyme),
                        nom: produit.nom
                    });
                }
            }
        }

        if (listeEntities.length > 0) {
            const entityOptions: Fuse.IFuseOptions<EntityFuse> = {
                keys: ["synonyme"],
                threshold: 0.4,
                includeScore: true,
                minMatchCharLength: 2,
                ignoreLocation: true
            };

            fuseEntities = new Fuse<EntityFuse>(
                listeEntities,
                entityOptions
            );
        } else {
            fuseEntities = null;
        }

        console.log(
            `[Fuse] Entities : ${listeEntities.length} entrées`
        );

        console.log("[Fuse] Initialisation terminée");
    } catch (error) {
        console.error(
            "[Fuse] Erreur lors du chargement :",
            error
        );

        fuseBusinesses.clear();
        fuseGlobal = null;
        fuseEntities = null;

        throw error;
    } finally {
        isLoading = false;
    }
}

// ======================================================
// FUSE BUSINESS
// ======================================================

function getBusinessFuse(
    businessId: number | string
): FuseProduit | null {
    return fuseBusinesses.get(String(businessId)) ?? null;
}

// ======================================================
// RECHERCHE FUSE
// ======================================================

function searchFuse<T>(
    fuse: Fuse<T> | null,
    msg: string
): FuseResult<T> | null {
    if (!fuse) {
        return null;
    }

    // ==========================================
    // 1. Recherche sur toute la phrase
    // ==========================================

    const fullResult = fuse.search(msg)[0];

    if (
        fullResult &&
        fullResult.score !== undefined &&
        fullResult.score <= 0.4
    ) {
        return fullResult;
    }

    // ==========================================
    // 2. Recherche mot par mot
    // ==========================================

    const words = msg
        .split(/\s+/)
        .filter(Boolean);

    let bestResult: FuseResult<T> | null = null;

    for (const word of words) {
        if (word.length < 2) {
            continue;
        }

        const result = fuse.search(word)[0];

        if (
            !result ||
            result.score === undefined
        ) {
            continue;
        }

        if (result.score <= 0.4) {
            if (
                !bestResult ||
                result.score < (bestResult.score ?? 1)
            ) {
                bestResult = result;
            }
        }
    }

    return bestResult;
}

// ======================================================
// EXTRACTION PRODUIT
// ======================================================

export function extractProduit(
    message: string,
    businessId: number | string
): ProduitFuse & {
    source: "business" | "global" | "entity";
    score?: number;
} | null {
    const msg = cleanMessage(message);

    console.log("[Produit] message :", message);
    console.log("[Produit] clean :", msg);

    if (!msg) {
        return null;
    }

    // ==========================================
    // 1. BUSINESS
    // ==========================================

    const businessFuse = getBusinessFuse(businessId);

    const businessResult = searchFuse(
        businessFuse,
        msg
    );

    if (businessResult) {
        console.log(
            "[Produit] Business :",
            businessResult
        );

        return {
            ...businessResult.item,
            source: "business",
            score: Number(businessResult.score),
        };
    }

    // ==========================================
    // 2. GLOBAL
    // ==========================================

    const globalResult = searchFuse(
        fuseGlobal,
        msg
    );

    if (globalResult) {
        console.log(
            "[Produit] Global :",
            globalResult
        );

        return {
            ...globalResult.item,
            source: "global",
            score: Number(globalResult.score)
        };
    }

    // ==========================================
    // 3. ENTITIES JSON
    // ==========================================

    const entityResult = searchFuse(
        fuseEntities,
        msg
    );

    if (entityResult) {
        console.log(
            "[Produit] Entity :",
            entityResult
        );

        return {
            ...entityResult.item,
            source: "entity",
            score: entityResult.score
        } as ProduitFuse & {
            source: "entity";
            score?: number;
        };
    }

    // ==========================================
    // RIEN TROUVÉ
    // ==========================================

    console.log("[Produit] Aucun produit trouvé");

    return null;
}

// ======================================================
// RECHARGEMENT
// ======================================================

export async function reloadFuseGlobal(): Promise<void> {
    console.log("[Fuse] Rechargement...");

    fuseBusinesses.clear();
    fuseGlobal = null;
    fuseEntities = null;

    await initFuseGlobal();
}