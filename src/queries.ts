import pg from "pg";
import { Request, Response } from 'express';

// Connect to the database using the DATABASE_URL environment
// variable injected by Railway
const pool = new pg.Pool({
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
    ssl: true
});

export const getUsers = (req: Request, res: Response) => {
    pool.query('SELECT * FROM public."user";', (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).json(result.rows);
    });
}

export const getUserById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    pool.query('SELECT * FROM public."user" WHERE id = $1', [id], (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).json(result.rows);
    })
}

export const createUser = (req: Request, res: Response) => {
    const { username, password } = req.body;

    pool.query('INSERT INTO public."user" (username, password) VALUES ($1, $2) RETURNING *', [username, password], (err, results) => {
        if (err) {
            throw err;
        }
        res.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
}

export const deleteUser = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    pool.query('DELETE FROM public."user" WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`User deleted with ID: ${id}`)
    })
}

export const updateUser = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { username, password } = req.body;

    pool.query(
        'UPDATE public."user" SET username = $1, password = $2 WHERE id = $3',
        [username, password, id],
        (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).send(`User modified with ID: ${id}`);
        }
    )
}