import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUser } from '../models/user';

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
	throw new Error('JWT_SECRET is not defined');
}

export const validateJWT = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const header = req.headers.authorization;
	if (header) {
		const token = header.split(' ')[1];

		jwt.verify(token, jwtSecret as jwt.Secret, (err, user) => {
			if (err) {
				console.log('error in validateJWT');
				return res.sendStatus(403);
			}
			req.user = user as { id: number; username: string };
			return next();
		});
	} else {
		console.log('header missing - unauthorized');
		return res.sendStatus(401);
	}
};

export const register = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { username, password } = req.body;
	try {
		const existingUser = await findUser(username);
		if (existingUser) {
			console.log('Username already exists');
			return res.sendStatus(400);
		} else if (!username || !password) {
			console.log('Username and/or password missing');
			return res.sendStatus(400);
		}
		const user = await createUser(username, password);
		res.locals.userId = user.user_id;
		return next();
	} catch (error) {
		next({
			status: 400,
			message: `Error in authController register: ${error}`,
		});
	}
};

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { username, password } = req.body;
	try {
		const user = await findUser(username);
		if (!user) {
			console.log('Username does not exist');
			return res.sendStatus(401);
		}

		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			console.log('Wrong password');
			return res.sendStatus(401);
		}

		const token = jwt.sign(
			{ id: user.user_id, username: user.username },
			jwtSecret as jwt.Secret,
			{ expiresIn: '1h' }
		);
		res.locals.auth = { token, userId: user.user_id };
		return next();
	} catch (error) {
		return next({
			status: 400,
			message: `Error in authController login ${error}`,
		});
	}
};
