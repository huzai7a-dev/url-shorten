import 'dotenv/config';
import express from 'express';
import bootstrap from './bootstrap.js';
import { Server } from 'http';
import { IncomingMessage } from 'http';
import { ServerResponse } from 'http';

const app = express();
const server: Server<typeof IncomingMessage, typeof ServerResponse> = await bootstrap(app);

function shutdown(exit: () => void) {
  server.close(() => exit());
}

if (process.env.NODE_ENV === 'production') {
  process.once('SIGUSR2', () => shutdown(() => process.kill(process.pid, 'SIGUSR2')));
  process.once('SIGINT', () => shutdown(() => process.exit(0)));
  process.once('SIGTERM', () => shutdown(() => process.exit(0)));
}
