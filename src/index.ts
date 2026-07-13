import 'dotenv/config';
import express from 'express';
import { pinoHttp } from 'pino-http';
import { logger } from './logger.js';
import router from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(express.json());
app.use(pinoHttp({ logger }));

const port = process.env.PORT ?? 3000;

app.use(router);

app.use(errorHandler);

const server = app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});

function shutdown(exit: () => void) {
  server.close(() => exit());
}

// process.once('SIGUSR2', () => shutdown(() => process.kill(process.pid, 'SIGUSR2')));
// process.once('SIGINT', () => shutdown(() => process.exit(0)));
// process.once('SIGTERM', () => shutdown(() => process.exit(0)));
