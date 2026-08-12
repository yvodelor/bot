
import { extractProduit } from "../chatbot/entityService";


// ======================================================
// TYPES
// ======================================================

export type FieldSchema = {
    champ: string;

    type:
        | "string"
        | "number"
        | "date"
        | "entity"
        | "email"
        | "phone"
        | "boolean";

    config?: {
        source?: string;
        keys?: string[];

        min?: number;
        max?: number;
    };
};


// ======================================================
// NUMBER
// ======================================================

function extractNumber(
    message: string
): number | null {

    const match = message.match(
        /(?:^|\s)(\d+(?:[.,]\d+)?)(?=\s|$)/
    );

    if (!match) {
        return null;
    }

    const rawValue = match[1];

    if (!rawValue) {
        return null;
    }

    const value = Number(
        rawValue.replace(",", ".")
    );

    return Number.isFinite(value)
        ? value
        : null;
}


// ======================================================
// EMAIL
// ======================================================

function extractEmail(
    message: string
): string | null {

    const match = message.match(
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
    );

    return match
        ? match[0]
        : null;
}


// ======================================================
// PHONE
// ======================================================

function extractPhone(
    message: string
): string | null {

    const match = message.match(
        /(?:\+?\d{1,3}[\s.-]?)?(?:\d[\s.-]?){8,12}/
    );

    if (!match) {
        return null;
    }

    return match[0].replace(
        /[\s.-]/g,
        ""
    );
}


// ======================================================
// DATE
// ======================================================

function extractDate(
    message: string
): string | null {

    // ------------------------------------------
    // Date numérique
    // ------------------------------------------

    const numericDate =
        message.match(
            /\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b/
        );

    if (numericDate) {
        return numericDate[0];
    }


    // ------------------------------------------
    // Date ISO
    // ------------------------------------------

    const isoDate =
        message.match(
            /\b\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}\b/
        );

    if (isoDate) {
        return isoDate[0];
    }


    // ------------------------------------------
    // Dates relatives
    // ------------------------------------------

    const normalized =
        message
            .toLowerCase()
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            );


    const relatives = [
        "aujourd'hui",
        "aujourd’hui",
        "demain",
        "apres demain",
        "après demain",
        "ce soir",
        "ce matin"
    ];


    for (const date of relatives) {

        if (normalized.includes(date)) {
            return date;
        }
    }


    return null;
}


// ======================================================
// BOOLEAN
// ======================================================

function extractBoolean(
    message: string
): boolean | null {

    const normalized =
        message
            .toLowerCase()
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            )
            .trim();


    const positive = [
        "oui",
        "d'accord",
        "dac",
        "ok",
        "okay",
        "bien sur",
        "exact",
        "confirme",
        "je confirme"
    ];


    const negative = [
        "non",
        "annule",
        "annuler",
        "je refuse"
    ];


    if (
        positive.some(
            value =>
                normalized === value ||
                normalized.includes(value)
        )
    ) {
        return true;
    }


    if (
        negative.some(
            value =>
                normalized === value ||
                normalized.includes(value)
        )
    ) {
        return false;
    }


    return null;
}


// ======================================================
// ENTITY EXTRACTORS
// ======================================================

type EntityExtractor = (
    message: string,
    tenantId: number
) => any;


const entityExtractors:
    Record<string, EntityExtractor> = {

    produits: (
        message,
        tenantId
    ) => {

        return extractProduit(
            message,
            tenantId
        );

    }

    // Plus tard :
    //
    // services: (
    //     message,
    //     tenantId
    // ) => extractService(
    //     message,
    //     tenantId
    // )

};


// ======================================================
// EXTRACTION PRINCIPALE
// ======================================================

export function extraireData(
    userMessage: string,
    schema: FieldSchema[],
    tenantData: any,
    tenantId: number,
    intentType?: string
): Record<string, any> {

    const result: Record<string, any> = {};


    if (!userMessage?.trim()) {
        return result;
    }


    for (const field of schema) {


        // ==================================================
        // ENTITY
        // ==================================================

        if (field.type === "entity") {

            const source =
                field.config?.source;

            if (!source) {
                continue;
            }

            const extractor =
                entityExtractors[source];

            if (!extractor) {
                console.warn(
                    `[Extraction] Aucun extracteur pour "${source}"`
                );

                continue;
            }

            const entity =
                extractor(
                    userMessage,
                    tenantId
                );

            if (!entity) {
                continue;
            }

            // Pour une entity, on récupère son nom
            if (entity.nom !== undefined) {

                result[field.champ] =
                    entity.nom;

            }
            else if (entity.name !== undefined) {

                result[field.champ] =
                    entity.name;

            }
            else {

                result[field.champ] =
                    entity;
            }

            continue;
        }


        // ==================================================
        // NUMBER
        // ==================================================

        if (field.type === "number") {

            const value =
                extractNumber(
                    userMessage
                );


            if (value === null) {
                continue;
            }


            if (
                field.config?.min !== undefined &&
                value < field.config.min
            ) {
                continue;
            }


            if (
                field.config?.max !== undefined &&
                value > field.config.max
            ) {
                continue;
            }


            result[field.champ] =
                value;

            continue;
        }


        // ==================================================
        // EMAIL
        // ==================================================

        if (field.type === "email") {

            const value =
                extractEmail(
                    userMessage
                );


            if (value) {

                result[field.champ] =
                    value;
            }


            continue;
        }


        // ==================================================
        // PHONE
        // ==================================================

        if (field.type === "phone") {

            const value =
                extractPhone(
                    userMessage
                );


            if (value) {

                result[field.champ] =
                    value;
            }


            continue;
        }


        // ==================================================
        // DATE
        // ==================================================

        if (field.type === "date") {

            const value =
                extractDate(
                    userMessage
                );


            if (value) {

                result[field.champ] =
                    value;
            }


            continue;
        }


        // ==================================================
        // STRING
        // ==================================================

        if (field.type === "string") {

            const value =
                userMessage.trim();


            if (value) {

                result[field.champ] =
                    value;
            }


            continue;
        }


        // ==================================================
        // BOOLEAN
        // ==================================================

        if (field.type === "boolean") {

            let value =
                extractBoolean(
                    userMessage
                );


            if (
                intentType === "affirmative"
            ) {
                value = true;
            }


            if (
                intentType === "negative"
            ) {
                value = false;
            }


            if (value !== null) {

                result[field.champ] =
                    value;
            }
        }
    }


    return result;
}

