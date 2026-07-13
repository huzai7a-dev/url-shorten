import { pool } from "../db/pool.js";
import { UrlRecord } from "../types/index.js";

class UrlRepository {
    async storeFullUrl(fullUrl: string): Promise<number> {
        const res = await pool.query('INSERT INTO urls (original_url) VALUES ($1) RETURNING id', [fullUrl]);
        return res.rows[0].id;
    }

    async mapShortUrlToFullUrl(id: number, shortUrl: string): Promise<string> {
        const res = await pool.query('UPDATE urls SET short_code = $1 WHERE id = $2 RETURNING short_code', [shortUrl, id]);
        return res.rows[0].short_code;
    }

    async findUrlByField(field: string, value: string): Promise<UrlRecord | null> {
        const res = await pool.query(`SELECT * FROM urls WHERE ${field} = $1`, [value]);
        if (res.rows.length === 0) {
            return null;
        }
        return res.rows[0];
    }
}

export default UrlRepository;