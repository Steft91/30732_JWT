import * as Sentry from '@sentry/node';

export class ResourceController {
    /**
     * Simula un recurso privado del Microservicio Alpha.
     */
    static getAlphaPrivateData(req, res) {
        throw new Error('Conexion perdida con la BDD en service-alpha');
    }

    /**
     * Simula un recurso privado del Microservicio Beta.
     */
    static getBetaPrivateData(req, res) {
        try {
            throw new Error('Fallo interno simulado en service-beta');
        } catch (error) {
            Sentry.withScope(scope => {
                scope.setTag('service', 'service-beta');
                scope.setTag('error_type', 'operational');
                scope.setExtra('userId', req.user.sub);
                scope.setExtra('route', req.originalUrl);
                scope.setExtra('method', req.method);
                Sentry.captureException(error);
            });

            return res.status(500).json({
                error: 'Error operacional',
                message: 'Fallo interno registrado en service-beta'
            });
        }
    }
}
