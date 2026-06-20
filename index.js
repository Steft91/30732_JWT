import './src/instrument.js';
import express from 'express';
import * as Sentry from '@sentry/node';
import { config } from './config/env.js';
import authRoutes from './routes/auth.routes.js';
import resourceRoutes from './routes/resource.routes.js';

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/', resourceRoutes);

Sentry.setupExpressErrorHandler(app);

app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    return res.status(500).json({
        error: 'Error operacional',
        message: 'Ocurrio un fallo interno en el servicio'
    });
});

app.listen(config.PORT, () => {
    console.log(`Server running on http://localhost:${config.PORT}`);
});
