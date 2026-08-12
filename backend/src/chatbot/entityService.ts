
import Fuse from "fuse.js";
import fs from "fs";
import path from "path";

import { produitService } from "../services/produitService";
import { cleanMessage } from "./cleanMessage";


// ======================================================
// TYPES
// ======================================================

interface ProduitFuse {
    synonyme: string;
    nom: string;
    id: number | string;
    business_id: string | null;
}

interface EntityFuse {
    synonyme: string;
    nom: string;
    id?: number | string;
}


// ======================================================
// INDEX FUSE
// ======================================================

// Un index par business
const fuseBusinesses =
    new Map<string, Fuse<ProduitFuse>>();

// Produits globaux
let fuseGlobal: Fuse<ProduitFuse> | null = null;

// Entités JSON
let fuseEntities: Fuse<EntityFuse> | null = null;

let isLoading = false;


// ======================================================
// OPTIONS FUSE
// ======================================================

const fuseOptions = {
    keys: ["synonyme"],
    threshold: 0.4,
    includeScore: true,
    minMatchCharLength: 2,
    ignoreLocation: true
};


// ======================================================
// INITIALISATION
// ======================================================

export async function initFuseGlobal() {

    if (isLoading) {
        return;
    }

    isLoading = true;

    try {

        console.log("[Fuse] Chargement en cours...");


        // ==================================================
        // 1. PRODUITS BDD
        // ==================================================

        const produits =
            await produitService.getAll();

        console.log(
            `[Fuse] ${produits.length} produits récupérés`
        );


        const produitsParBusiness =
            new Map<string, ProduitFuse[]>();

        const produitsGlobaux: ProduitFuse[] = [];


        // ==================================================
        // 2. INDEXER LES PRODUITS BDD
        // ==================================================

        for (const produit of produits) {

            /*
             * La BDD possède :
             *
             * id
             * name
             * business_id
             *
             * Il n'y a PAS de synonymes.
             */

            if (!produit.name) {
                continue;
            }


            const entree: ProduitFuse = {

                // Le name est le terme recherché
                synonyme:
                    cleanMessage(produit.name),

                nom:
                    produit.name,

                id:
                    produit.id,

                business_id:
                    produit.business_id ?? null

            };


            // ==============================================
            // PRODUIT GLOBAL
            // ==============================================

            if (
                produit.business_id === null ||
                produit.business_id === undefined
            ) {

                produitsGlobaux.push(
                    entree
                );

                continue;
            }


            // ==============================================
            // PRODUIT BUSINESS
            // ==============================================

            const businessId =
                String(produit.business_id);


            if (
                !produitsParBusiness.has(
                    businessId
                )
            ) {

                produitsParBusiness.set(
                    businessId,
                    []
                );

            }


            produitsParBusiness
                .get(businessId)!
                .push(entree);

        }


        // ==================================================
        // 3. FUSE DES BUSINESSES
        // ==================================================

        fuseBusinesses.clear();


        for (
            const [businessId, listeProduits]
            of produitsParBusiness
        ) {

            const fuse =
                new Fuse(
                    listeProduits,
                    fuseOptions
                );


            fuseBusinesses.set(
                businessId,
                fuse
            );


            console.log(
                `[Fuse] Business ${businessId} : ` +
                `${listeProduits.length} produits`
            );

        }


        // ==================================================
        // 4. FUSE GLOBAL
        // ==================================================

        if (
            produitsGlobaux.length > 0
        ) {

            fuseGlobal =
                new Fuse(
                    produitsGlobaux,
                    fuseOptions
                );

        }


        console.log(
            `[Fuse] Global : ` +
            `${produitsGlobaux.length} produits`
        );


        // ==================================================
        // 5. ENTITIES.FR.JSON
        // ==================================================


// ==================================================
// 5. ENTITIES.FR.JSON
// ==================================================

const entitiesPath = path.join(
    __dirname,
    "../types/entities.fr.json"
);

const entitiesData = JSON.parse(
    fs.readFileSync(
        entitiesPath,
        "utf-8"
    )
);

const listeEntities: EntityFuse[] = [];

for (const categorie of entitiesData.categories || []) {

    for (const produit of categorie.produits || []) {

        const synonymes = produit.synonymes || [];

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

    fuseEntities = new Fuse(
        listeEntities,
        fuseOptions
    );

}

console.log(
    `[Fuse] Entities : ${listeEntities.length} entrées`
);



        if (
            listeEntities.length > 0
        ) {

            fuseEntities =
                new Fuse(
                    listeEntities,
                    {
                        keys: ["synonyme"],
                        threshold: 0.4,
                        includeScore: true,
                        minMatchCharLength: 2,
                        ignoreLocation: true
                    }
                );

        }


        console.log(
            `[Fuse] Entities : ` +
            `${listeEntities.length} entrées`
        );


        console.log(
            "[Fuse] Initialisation terminée"
        );

    }
    catch (error) {

        console.error(
            "[Fuse] Erreur lors du chargement :",
            error
        );


        fuseBusinesses.clear();

        fuseGlobal = null;

        fuseEntities = null;


        throw error;

    }
    finally {

        isLoading = false;

    }
}


// ======================================================
// FUSE BUSINESS
// ======================================================

function getBusinessFuse(
    businessId: number | string
): Fuse<ProduitFuse> | null {

    return (
        fuseBusinesses.get(
            String(businessId)
        ) || null
    );

}


//======================================================
// 
//
function searchFuse<T>(
    fuse: Fuse<T> | null,
    msg: string
): Fuse.FuseResult<T> | null {

    if (!fuse) {
        return null;
    }

    // ==========================================
    // 1. Recherche sur toute la phrase
    // ==========================================

    const fullResult =
        fuse.search(msg)[0];

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

    const words =
        msg
            .split(/\s+/)
            .filter(Boolean);

    let bestResult:
        Fuse.FuseResult<T> | null = null;


    for (const word of words) {

        if (word.length < 2) {
            continue;
        }

        const result =
            fuse.search(word)[0];

        if (
            !result ||
            result.score === undefined
        ) {
            continue;
        }

        if (result.score <= 0.4) {

            if (
                !bestResult ||
                result.score <
                (bestResult.score ?? 1)
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
    businessId: number
) {

    const msg = cleanMessage(message);

    console.log(
        "[Produit] message :",
        message
    );

    console.log(
        "[Produit] clean :",
        msg
    );

    if (!msg) {
        return null;
    }


    // ==========================================
    // 1. BUSINESS
    // ==========================================

    const businessFuse =
        getBusinessFuse(businessId);

    const businessResult =
        searchFuse(
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
            score: businessResult.score
        };
    }


    // ==========================================
    // 2. GLOBAL
    // ==========================================

    const globalResult =
        searchFuse(
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
            score: globalResult.score
        };
    }


    // ==========================================
    // 3. ENTITIES JSON
    // ==========================================

    const entityResult =
        searchFuse(
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
        };
    }


    // ==========================================
    // RIEN TROUVÉ
    // ==========================================

    console.log(
        "[Produit] Aucun produit trouvé"
    );

    return null;
}



// ======================================================
// RECHARGEMENT
// ======================================================

export async function reloadFuseGlobal() {

    console.log(
        "[Fuse] Rechargement..."
    );


    fuseBusinesses.clear();

    fuseGlobal = null;

    fuseEntities = null;


    await initFuseGlobal();

}


/*
// 6. RELOAD APRES CREATE/UPDATE/DELETE
export async function reloadFuseGlobal() {
  fuseInstance = null; // on vide
  await initFuseGlobal(); // on recharge
}
// *2. `server.ts` - LANCER AU DEMARRAGE*
import { initFuseGlobal } from './entityService';

app.listen(3000, async () => {
  await initFuseGlobal(); // CHARGER 1 FOIS ICI
  console.log('Serveur lancé sur 3000');
});




// *3. `chatController.ts` - UTILISER PARTOUT*
import { extractProduit, reloadFuseGlobal } from './entityService';

app.post('/chat/message', (req,res) => {
  const { message, tenantId } = req.body;
  const entite = extractProduit(message, tenantId); // utilise le même fuse pour tous

  res.json({ entite });
});

// CRUD
app.post('/admin/produits', async (req,res) => {
  await db.query('INSERT...');
  reloadFuseGlobal(); // recharge en background pour tout le monde
  res.json({ok: true});
});
*/