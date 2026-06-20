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
        return res.json({
            service: 'service-beta',
            message: 'Acceso concedido al recurso privado del Servicio Beta',
            authenticated_user: req.user
        });
    }
}
