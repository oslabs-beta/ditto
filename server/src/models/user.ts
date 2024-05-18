import db from '../db';
import bcrypt from 'bcrypt';

const salt = 10;

export interface User {
    user_id: number;
    username: string;
    password: string;
    date_created: string;
};

export const createUser = async (username: string, password: string): Promise<User> => {

  const hashedPassword = await bcrypt.hash(password, salt);
    const queryString = `
      INSERT INTO users (username, password)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const result = await db.parameterizedQuery(queryString, [username, hashedPassword]);
    return result[0] as User;
};

export const findUser = async (username: string): Promise<User | null> => {
    const queryString = `
      SELECT * FROM users WHERE username = $1;
    `;
    const result = await db.parameterizedQuery(queryString, [username]);
    return result.length > 0 ? (result[0] as User) : null;
};
