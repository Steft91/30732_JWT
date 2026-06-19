import { JwtService } from '../services/jwt.service.js';

export class AuthController {
    /**
     * Simula un servidor de autenticación que genera un token.
     */
    static async generateToken(req, res) {
        const { username, password } = req.body ?? {};

        if (username !== 'admin' || password !== '123456') {
            return res.status(401).json({
                error: 'Credenciales invalidas',
                message: 'Usuario o contrasena incorrectos'
            });
        }

        const user = {
            id: '1',
            name: 'Administrador del Sistema'
        };

        const token = JwtService.signToken(user);

        return res.json({
            token,
            token_type: 'Bearer',
            expires_in: 60
        });
    }
}
