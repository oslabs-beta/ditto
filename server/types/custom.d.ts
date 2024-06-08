import { User } from '../src/models/user';
import 'express-session';
import { Request } from 'express';

declare global {
	namespace Express {
		interface Request {
			user?: { id: number; username: string };
		}
	}
}

declare module 'express-session' {
	interface SessionData {
		user: { id: number; username: string };
	}
}

export {};
