import express, { Request, Response, NextFunction } from 'express';
import { githubCallback, githubLogin, logout } from '../controllers/githubAuthController';

const router = express.Router();

router.get('/login', githubLogin);

router.get('/callback', githubCallback, (req: Request, res: Response) => {
    res.status(200).json({ message: 'Github auth successful', user: req.session.user });
}); //might need to change this status to an actual redirect to our main page? 

router.get('/logout', logout);

export default router;