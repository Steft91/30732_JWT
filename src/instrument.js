import 'dotenv/config';
import * as Sentry from '@sentry/node';

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.SENTRY_ENVIRONMENT || 'development',
    sendDefaultPii: false,
    tracesSampleRate: 1.0
});
