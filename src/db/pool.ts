import { Pool } from 'pg';
import 'dotenv/config';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,                       // how many concurrent connections you actually expect to need
  idleTimeoutMillis: 30000,      // close idle clients after 30s
  connectionTimeoutMillis: 5000, // fail fast instead of hanging forever if pool is exhausted
});