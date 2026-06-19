export class ResourceController {
    /**
     * Simula un recurso privado del Microservicio Alpha.
     */
    static getAlphaPrivateData(req, res) {
        return res.json({
            service: 'service-alpha',
            message: 'Acceso concedido al recurso privado del Servicio Alpha',
            authenticated_user: req.user
        });
    }

    /**
     * Simula un recurso privado del Microservicio Beta.
     */
    static getBetaPrivateData(req, res) {
        return res.json({
            service: 'service-beta',
            message: 'Acceso concedido al recurso privado del Servicio Beta',
            authenticated_user: req.user
        });
    }
}
