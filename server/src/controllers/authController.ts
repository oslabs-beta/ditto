import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createUser, findUser } from '../models/user'


const jwtSecret = process.env.JWT_SECRET 

if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined');
}

export const validateJWT = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization

    if (header) {
        const token = header.split(' ')[1];

        jwt.verify(token, jwtSecret as jwt.Secret, (err, user) => {
            if(err) {
                return res.sendStatus(403)
            }

            req.user = user as { id: number; username: string};
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    try {
        const existingUser = await findUser(username);
        console.log("findme")
        if(existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        const user = await createUser(username, password);
        res.status(201).json({ message: 'Successfully created user', user });
    } catch(error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    try {
        const user = await findUser(username);
        if(!user) {
            return res.status(401).json({ error: 'Invalid user credentials' });
        }
        const match = await bcrypt.compare(password, user.password);
        if(!match) {
            return res.status(401).json({ error: 'Invalid password credentials' });
        }
        const token = jwt.sign({ id: user.user_id, username: user.username }, jwtSecret as jwt.Secret, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login succesful', token });
    } catch(error) {
        next(error)
    }
};
