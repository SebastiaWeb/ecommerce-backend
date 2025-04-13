import { Module } from '@nestjs/common';
import { AuthService } from './application/auth.service';
import { EnvAuthAdapter } from '../adapters/env/env.auth.adapter';
import { AuthController } from '../adapters/http/auth.controller';
import { AUTH_PORT } from './ports/auth.port';

@Module({
  providers: [
    {
      provide: AUTH_PORT,
      useClass: EnvAuthAdapter,
    },
    EnvAuthAdapter,
    AuthService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}