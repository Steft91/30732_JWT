import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export class JwtService {
    /**
     * Firma un token JWT basándose en el algoritmo configurado.
     * @param {Object} payload - Los datos del usuario a incluir en el token.
     * @returns {string} El token JWT generado.
     */
    static signToken(payload) {
        const tokenPayload = {
            sub: payload.id,
            name: payload.name,
            exp: Math.floor(Date.now() / 1000) + 60
        };

        if (config.ALGORITHM === 'RS256') {
            if (!config.PRIVATE_KEY) {
                throw new Error('La llave privada no esta configurada');
            }

            return jwt.sign(tokenPayload, config.PRIVATE_KEY, { algorithm: 'RS256' });
        }

        if (!config.JWT_SECRET) {
            throw new Error('El secreto JWT no esta configurado');
        }

        return jwt.sign(tokenPayload, config.JWT_SECRET, { algorithm: 'HS256' });
    }

    /**
     * Verifica un token JWT basándose en el algoritmo configurado.
     * @param {string} token - El token JWT a verificar.
     * @returns {Object|null} El payload decodificado o null si es inválido.
     */
    static verifyToken(token) {
        if (config.ALGORITHM === 'RS256') {
            if (!config.PUBLIC_KEY) {
                throw new Error('La llave publica no esta configurada');
            }

            return jwt.verify(token, config.PUBLIC_KEY, { algorithms: ['RS256'] });
        }

        if (!config.JWT_SECRET) {
            throw new Error('El secreto JWT no esta configurado');
        }

        return jwt.verify(token, config.JWT_SECRET, { algorithms: ['HS256'] });
    }
}
