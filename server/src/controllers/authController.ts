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
		//store token (Bearer <token>) from header
		const token = header.split(' ')[1];

		jwt.verify(token, jwtSecret as jwt.Secret, (err, user) => {
			if (err) {
				return res.sendStatus(403);
			}
			//attach decoded user info to req object
			req.user = user as { id: number; username: string };
			return next();
		});
	} else {
		return next({
			status: 401,
			message: 'Error in authController validateJWT: Unauthorized',
		});
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
			return next({
				status: 400,
				message: 'Username already exists',
			});
		}
		const user = await createUser(username, password);
		res.locals.message = `Successfully created user ${user.username}`;
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
			return next({
				status: 401,
				message: 'Username does not exist',
			});
		}
		//compare given pass with stored hashed pass
		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			return next({
				status: 401,
				message: 'Incorrect password',
			});
		}
		//generate JWT token with user iD and username valid for 1 hr
		const token = jwt.sign(
			{ id: user.user_id, username: user.username },
			jwtSecret as jwt.Secret,
			{ expiresIn: '1h' }
		);
		res.locals.message = `Login Successful ${token}`;
		return next();
	} catch (error) {
		return next({
			status: 400,
			message: `Error in authController login ${error}`,
		});
	}
};
