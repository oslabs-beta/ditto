import { Request, Response, NextFunction } from 'express';
import { createOAuthUser, findUser } from '../models/user';
import axios from 'axios';

const clientId = process.env.GITHUB_CLIENT_ID as string;
const clientSecret = process.env.GITHUB_CLIENT_SECRET as string;
const redirectUri = 'http://localhost:3001/github/callback'; // This should match the registered URL

if (!clientId || !clientSecret) {
    throw new Error('GitHub Client ID and Secret are not defined');
}

//redirect to github ouath url
export const githubLogin = (req: Request, res: Response) => {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
    res.redirect(githubAuthUrl);
};

export const githubCallback = async (req: Request, res: Response, next: NextFunction) => {
    //get auth code from query 
    const code = req.query.code as string;

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

        if (!accessToken) {
            return res.status(400).json({ error: 'No access token received' });
        }
        //get users data from github
        const userResponse = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        //get data from response and store in userData
        const userData = userResponse.data;
        
        let user = await findUser(userData.login);
        if (!user) {
            user = await createOAuthUser(userData.login);
        }
        //save users session data
        req.session.user = { id: user.user_id, username: user.username };
        return next();
    } catch (error) {
        next(error);
    }
};

export const logout = (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to log out' });
        }
        res.redirect('/');
    });
};
