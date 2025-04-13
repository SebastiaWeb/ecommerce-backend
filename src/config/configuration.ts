import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
    path: path.resolve(process.env.NODE_ENV === 'production' ? '.env.prod' : '.env')
});

export const envConfig = {
    AUTH_USERNAME: process.env.AUTH_USERNAME || 'admin',
    AUTH_PASSWORD: process.env.AUTH_PASSWORD || 'secret123',
    JWT_SECRET: process.env.JWT_SECRET || 'defaultSecretKey',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
    SWAGGER_TITLE: process.env.SWAGGER_TITLE || 'API Documentation',
    SWAGGER_DESCRIPTION: process.env.SWAGGER_DESCRIPTION || 'API with Hexagonal Architecture',
    SWAGGER_VERSION: process.env.SWAGGER_VERSION || '1.0',
    SWAGGER_PATH: process.env.SWAGGER_PATH || 'docs',
};