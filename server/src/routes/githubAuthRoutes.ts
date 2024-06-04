import express from 'express';
import { githubCallback, githubLogin, logout } from '../controllers/githubAuthController';

const router = express.Router();

router.get('/login', githubLogin);

router.get('/callback', githubCallback);

router.get('/logout', logout);

export default router;