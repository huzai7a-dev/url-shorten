import express, { Express } from 'express';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './logger.js';
import { pinoHttp } from 'pino-http';
import { asyncLocalStorage } from './context.js';

const bootstrap = async (app: Express) => {
    // middlewares
    app.set('trust proxy', 1); // trust first proxy e.g NGINX
    app.use(express.json());
    app.use(pinoHttp({ logger }));
    app.use((req, res, next) => {
        asyncLocalStorage.run({ log: req.log }, () => next());
    });

    //routes
    app.use('/api', (await import('./modules/url/url.route.js')).default);

    //404 handler
    app.use('/{*splat}', (req, res) => {
        res.status(404).json({ message: 'Route not found' });
    });

    //error handler
    app.use(errorHandler);

    const port = process.env.PORT ?? 3000;


    const server = app.listen(port, () => {
        logger.info(`Server listening on port ${port}`);
    });

    return server;
}

export default bootstrap;