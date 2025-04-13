import { Injectable } from '@nestjs/common';
import { AuthPort } from '../../domain/ports/auth.port';
import { User } from '../../domain/models/user.model';

@Injectable()
export class ValidateTokenUseCase {
  constructor(private readonly authPort: AuthPort) {}

  async execute(token: string): Promise<User> {
    return this.authPort.verifyToken(token);
  }
}