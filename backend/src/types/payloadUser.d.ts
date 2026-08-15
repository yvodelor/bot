import "express";

declare global {
    namespace Express {
        interface Request {
            user?: {
                sub: number;
                email: string;
                role?: number;
            };

            queryContext?: {
                field?: string;
                value?: string;
                enableAccess?: boolean;
            };
        }
    }
}

export {};