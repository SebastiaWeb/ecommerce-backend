import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { JwtAuthService } from './infrastructure/services/jwt.service';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { ValidateTokenUseCase } from './application/use-cases/validate-token.use-case';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AuthPort',
      useClass: JwtAuthService,
    },
    // {
    //   provide: 'UserRepositoryPort',
    //   useClass: UserRepositoryPort, // Implementación concreta
    // },
    LoginUseCase,
    ValidateTokenUseCase,
    JwtStrategy,
  ],
  exports: ['AuthPort'],
})
export class AuthModule {}