import { Media } from '../interfaces';
import pool from '../config/database';

export class MediaService {
    async saveMedia(media: Media): Promise<Media> {
        const query = `
            INSERT INTO media (filename, mimetype, path, updated_at, deleted) 
            VALUES ($1, $2, $3, CURRENT_TIMESTAMP, false) 
            RETURNING *`;
        const values = [media.filename, media.mimetype, media.path];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    async getMediaById(id: number): Promise<Media | null> {
        const query = 'SELECT * FROM media WHERE id = $1 AND deleted = false';
        const result = await pool.query(query, [id]);
        return result.rows[0] || null;
    }

    async getAllMediaInfo(): Promise<Media[]> {
        console.log('getAllMediaInfo');
        const query = 'SELECT id, filename, mimetype, created_at, updated_at FROM media WHERE deleted = false';
        const result = await pool.query(query);
        return result.rows;
    }

    async deleteMedia(id: number): Promise<void> {
        const query = 'UPDATE media SET deleted = true WHERE id = $1';
        await pool.query(query, [id]);
    }

    async updateMedia(id: number, media: Media): Promise<Media | null> {
        const query = `
            UPDATE media 
            SET filename = $1, mimetype = $2, path = $3, updated_at = CURRENT_TIMESTAMP 
            WHERE id = $4 AND deleted = false 
            RETURNING *`;
        const values = [media.filename, media.mimetype, media.path, id];
        const result = await pool.query(query, values);
        return result.rows[0] || null;
    }
}