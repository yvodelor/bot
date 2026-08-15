import { UserPayload } from "../middleware/authMiddleware";

export type AccessConfig = {
    field?: string;
    joins?: string[];
};

export type QueryContext = {
    user?: UserPayload | undefined;
    userId?: number | undefined;
    enableAccess?: boolean;
};