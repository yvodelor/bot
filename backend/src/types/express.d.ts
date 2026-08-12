import { UserPayload } from "../middleware/auth.middleware";

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;

      queryContext?: {
        businessId?: number;
        tenantId?: number;
        userId?: number;
        [key: string]: any;
      };
    }
  }
}

export {};