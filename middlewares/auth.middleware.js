import { JwtService } from '../services/jwt.service.js';

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            error: 'Token ausente',
            message: 'Debe enviar el encabezado Authorization con formato Bearer <token>'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        req.user = JwtService.verifyToken(token);
        return next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                error: 'Token expirado',
                message: 'El token ya no es valido. Solicite uno nuevo.'
            });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({
                error: 'Token invalido',
                message: error.message
            });
        }

        return res.status(500).json({
            error: 'Error de autenticacion',
            message: error.message
        });
    }
};
