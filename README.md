# Practica JWT Stateless con RS256

Este proyecto simula una arquitectura distribuida con un servidor de identidad y dos microservicios protegidos. El servidor de identidad firma tokens JWT con una llave privada y los servicios validan la firma usando la llave publica compartida.

## Requisitos

- Node.js
- npm
- OpenSSL
- Postman o Insomnia

## Configuracion del entorno

Instalar dependencias:

```bash
npm install
```

Generar el par de llaves:

```bash
./keypair.sh
```

Crear el archivo `.env`:

```bash
cp .env.example .env
```

Configuracion esperada:

```env
PORT=3000
JWT_SECRET=mi_secreto_super_secreto
JWT_ALGORITHM=RS256
PRIVATE_KEY_PATH=./private.pem
PUBLIC_KEY_PATH=./public.pem
```

Levantar el servidor:

```bash
npm start
```

## Endpoints

Generar token:

```http
POST http://localhost:3000/auth/token
Content-Type: application/json

{
  "username": "admin",
  "password": "123456"
}
```

Acceder al microservicio Alpha:

```http
GET http://localhost:3000/v1/service-alpha/private
Authorization: Bearer <token>
```

Acceder al microservicio Beta:

```http
GET http://localhost:3000/v1/service-beta/private
Authorization: Bearer <token>
```

El token expira en 60 segundos. Despues de ese tiempo, los servicios responden con un error controlado de token expirado.

## Analisis tecnico: Refresh Tokens

Los JWT de acceso son stateless y, en esta practica, expiran en un minuto. Esta expiracion corta reduce el impacto de un token robado, porque el atacante tendria una ventana de uso muy limitada. Sin embargo, para el usuario seria incomodo iniciar sesion nuevamente cada minuto. Un Refresh Token solucionaria esa experiencia permitiendo solicitar nuevos Access Tokens sin volver a enviar credenciales.

La idea recomendada es separar responsabilidades: el Access Token viaja hacia los microservicios y se valida de forma autonoma con la llave publica; el Refresh Token solo se envia al servidor de identidad cuando el cliente necesita renovar la sesion. Asi, los microservicios siguen siendo stateless y no necesitan consultar una base central para cada peticion.

Para no comprometer la seguridad, el Refresh Token debe tener mayor proteccion que el Access Token. Puede almacenarse del lado del cliente en una cookie segura con las banderas `HttpOnly`, `Secure` y `SameSite`, evitando que JavaScript lo lea directamente y reduciendo riesgos de XSS. El servidor de identidad debe gestionar su ciclo de vida: emision, rotacion, expiracion, revocacion y deteccion de reutilizacion.

En buenas practicas, el cliente conserva el Refresh Token como cookie segura, pero la autoridad real sobre su validez debe estar en el servidor de identidad. Esto permite cerrar sesiones, invalidar tokens comprometidos y mantener los servicios distribuidos desacoplados del almacenamiento central.
