import { Pool } from "pg";
import { UrlRecord } from "./types.js";
import { encodeBase62 } from "../../lib/base62.js";
import { ConflictError } from "../../utils/error.js";

class UrlRepository {
    constructor(private pool: Pool) {}

    async createShortUrl(fullUrl: string): Promise<string> {
        const client = await this.pool.connect();

        try {
            await client.query('BEGIN');

            const insertRes = await client.query(
                'INSERT INTO urls (original_url) VALUES ($1) RETURNING id', [fullUrl]
            );

            const id = insertRes.rows[0].id;
            const shortUrl = encodeBase62(id);

            await client.query('UPDATE urls SET short_code = $1 WHERE id = $2 RETURNING short_code', [shortUrl, id]);
            await client.query('COMMIT');

            return shortUrl;

        } catch (error:any) {

            await client.query('ROLLBACK');
            
            if (error.code === '23505') { // unique_violation
                throw new ConflictError('URL already exists', error);
            }
            throw error;
        }finally {
            client.release();
        }

    }

    async findUrlByField(field: string, value: string): Promise<UrlRecord | null> {
        const validFields = ['original_url', 'short_code'];

        if (!validFields.includes(field)) {
            throw new Error(`Invalid field: ${field}`);
        }
        const res = await this.pool.query(`SELECT * FROM urls WHERE ${field} = $1`, [value]);
        if (res.rows.length === 0) {
            return null;
        }
        return res.rows[0];
    }
}

export default UrlRepository;