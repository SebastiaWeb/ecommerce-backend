import { Injectable } from '@nestjs/common';
import { AuthPort } from '../../domain/ports/auth.port';
import { User } from '../../domain/models/user.model';

@Injectable()
export class LoginUseCase {
  constructor(private readonly authPort: AuthPort) {}

  async execute(email: string, password: string): Promise<{ token: string }> {
    const user = await this.authPort.validateUser(email, password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return {
      token: await this.authPort.generateToken(user),
    };
  }
}