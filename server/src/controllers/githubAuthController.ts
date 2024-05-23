import { Request, Response, NextFunction } from 'express';
import { createOAuthUser, findUser } from '../models/user';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { access } from 'fs';

const clientId = process.env.GITHUB_CLIENT_ID as string;
const clientSecret = process.env.GITHUB_CLIENT_SECRET as string;
const jwtSecret = process.env.JWT_SECRET as string;
const redirectUri = 'http://localhost:3001/github/callback'; // This should match the registered URL

// if (!clientId || !clientSecret) {
//     throw new Error('GitHub Client ID and Secret are not defined');
// }

//redirect to github ouath url
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
	console.log('code:', code, 'typeof code:', typeof code)
	if (!code) {
		return res.status(400).json({ error: 'No code provided' });
	}

	try {
		//exchange code for access token
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
		//get token from response
		const accessToken = tokenResponse.data.access_token;
			console.log('accesstoken:' , accessToken)
		if (!accessToken) {
			return res.status(400).json({ error: 'No access token received' });
		}

		const userResponse = await axios.get('https://api.github.com/user', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		const userData = userResponse.data;
		console.log('userData:', userData)
		let user = await findUser(userData.login);
		if (!user) {
			user = await createOAuthUser(userData.login);
		}

		const token = jwt.sign(
			{ id: user.user_id, username: user.username },
			jwtSecret as jwt.Secret,
			{ expiresIn: '1h' }
		);
			console.log('token:', token, 'typeof token:', typeof token)
		const frontendUrl = `http://localhost:3000/githubs/callbacks?token=${token}`;
		// const frontendUrl = `http://localhost:3000/migration`
		//check endpoint for front end main page
		res.redirect(frontendUrl);
		console.log("i am redirecting to front end")
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
}; // no longer using session so change this 
