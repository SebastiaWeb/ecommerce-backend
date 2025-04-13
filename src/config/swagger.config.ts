// src/config/swagger.config.ts
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { envConfig } from './configuration';

export const configureSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle(envConfig.SWAGGER_TITLE || 'API Documentation')
    .setDescription(envConfig.SWAGGER_DESCRIPTION || 'API with Hexagonal Architecture')
    .setVersion(envConfig.SWAGGER_VERSION || '1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth'
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(envConfig.SWAGGER_PATH || 'docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // Mantiene el token entre recargas
      defaultModelExpandDepth: -1 // Oculta los schemas por defecto
    }
  });
};