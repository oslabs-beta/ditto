import { Request, Response, NextFunction } from 'express';
import { createOAuthUser, findUser } from '../models/user';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const clientId =
	process.env.NODE_ENV === 'production'
		? (process.env.GITHUB_CLIENT_ID_PRD as string)
		: (process.env.GITHUB_CLIENT_ID_DEV as string);
const clientSecret =
	process.env.NODE_ENV === 'production'
		? (process.env.GITHUB_CLIENT_SECRET_PRD as string)
		: (process.env.GITHUB_CLIENT_SECRET_DEV as string);
const jwtSecret = process.env.JWT_SECRET as string;
const redirectUri =
	process.env.NODE_ENV === 'production'
		? '3.216.47.20:3000'
		: 'http://localhost:3000'; // This should match the registered URL

export const githubLogin = (req: Request, res: Response) => {
	const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
	res.redirect(githubAuthUrl);
};

export const githubCallback = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const code = req.query.code as string;
	if (!code) {
		return res.status(400).json({ error: 'No code provided' });
	}

	try {
		const tokenResponse = await axios.post(
			'https://github.com/login/oauth/access_token',
			{
				client_id: clientId,
				client_secret: clientSecret,
				code,
				redirect_uri: redirectUri,
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			}
		);
		const accessToken = tokenResponse.data.access_token;
		if (!accessToken) {
			return res.status(400).json({ error: 'No access token received' });
		}

		const userResponse = await axios.get('https://api.github.com/user', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		const userData = userResponse.data;
		let user = await findUser(userData.login);
		if (!user) {
			user = await createOAuthUser(userData.login);
		}

		const token = jwt.sign(
			{ id: user.user_id, username: user.username },
			jwtSecret as jwt.Secret,
			{ expiresIn: '1h' }
		);
		const frontendUrl =
			process.env.NODE_ENV === 'production'
				? `http://3.216.47.20:8080/githubauthorized?token=${token}`
				: `http://localhost:8080/githubauthorized?token=${token}`;
		res.redirect(frontendUrl);
	} catch (error) {
		return next({
			message: `Error in githubAuthController githubCallback ${error}`,
		});
	}
};

export const logout = (req: Request, res: Response) => {
	req.session.destroy(err => {
		if (err) {
			return res.status(500).json({ error: 'Failed to log out' });
		}
		res.redirect('/');
	});
};
