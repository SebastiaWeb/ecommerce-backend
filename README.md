<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
  <a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
</p>

## Descripción del Proyecto

Este es un proyecto NestJS que implementa una arquitectura hexagonal para un sistema de comercio electrónico. Incluye autenticación JWT, integración con Wompi para pagos, y una base de datos PostgreSQL.

## Configuración del Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Auth Basic
AUTH_USERNAME=
AUTH_PASSWORD=

# JWT Configuration
JWT_SECRET=
JWT_EXPIRES_IN=

# Swagger
SWAGGER_TITLE=API Documentation
SWAGGER_DESCRIPTION=API with Hexagonal Architecture
SWAGGER_VERSION=1.0
SWAGGER_PATH=docs

# Database Configuration
POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
NODE_ENV=

# Wompi Configuration
WOMPI_BASE_URL=URL
WOMPI_PUBLIC_KEY=
WOMPI_PRIVATE_KEY=

#Configuración de la Base de Datos con Docker
Para levantar la base de datos PostgreSQL con Docker, ejecuta el siguiente comando:

docker run --name ecommerce-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=ecommerce -p 5432:5432 -d postgres