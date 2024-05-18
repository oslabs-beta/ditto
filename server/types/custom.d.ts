import { User } from '../src/models/user'

declare global {
    namespace Express {
        interface Request {
            user?: { id: number; username: string};
        }
    }
}

export {};