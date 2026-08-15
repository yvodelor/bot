let pgvector: typeof import("pgvector/pg") | null = null;

async function getPgVector() {
    if (!pgvector) {
        pgvector = await import("pgvector/pg");
    }

    return pgvector;
}

export async function toSql(
    embedding: number[]
): Promise<string> {
    const { toSql } = await getPgVector();

    const result = toSql(embedding);

    if (result === null) {
        throw new Error("Impossible de convertir l'embedding en SQL vector");
    }

    return result;
}