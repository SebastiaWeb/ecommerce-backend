import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { AuthPort } from '../../domain/ports/auth.port';
import { User } from '../../domain/models/user.model';
import { UserRepositoryPort } from '../../domain/ports/user-repository.port';

@Injectable()
export class JwtAuthService implements AuthPort {
  constructor(
    private readonly jwtService: NestJwtService,
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async generateToken(user: User): Promise<string> {
    const payload = { 
      email: user.email, 
      sub: user.id,
      roles: user.roles 
    };
    return this.jwtService.sign(payload);
  }

  async verifyToken(token: string): Promise<User> {
    const payload = this.jwtService.verify(token);
    return new User(
      payload.sub,
      payload.email,
      '', // No necesitamos la contraseña aquí
      payload.roles,
    );
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    if (user && user.password === password) { // En producción usa bcrypt
      return user;
    }
    return null;
  }
}