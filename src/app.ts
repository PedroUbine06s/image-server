import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

interface Item {
    id: number;
    name: string;
    description: string;
}

app.get('/:id', async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    try {
        const result = await pool.query<Item>('SELECT * FROM items WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

interface CreateItemRequest {
    name: string;
    description: string;
}

app.post('/', async (req: Request<{}, {}, CreateItemRequest>, res: Response) => {
    const { name, description } = req.body;
    try {
        const result = await pool.query<Item>(
            'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *',
            [name, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});