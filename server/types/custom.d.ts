import { User } from '../src/models/user'
import 'express-session';

declare global {
    namespace Express {
        interface Request {
            user?: { id: number; username: string};
        }
    }
}

declare module 'express-session' {
    interface SessionData {
    user: { id: number; username: string};
    }
}

export {};