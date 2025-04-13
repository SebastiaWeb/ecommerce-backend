import { Injectable, Inject } from '@nestjs/common';
import { AUTH_PORT, AuthPort } from '../ports/auth.port';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_PORT) private readonly authPort: AuthPort // Inyectamos usando la interfaz
  ) {}

  async login(username: string, password: string): Promise<string | null> {
    const isValid = await this.authPort.validateCredentials(username, password);
    if (!isValid) return null;
    
    return this.authPort.generateToken({ username });
  }
}