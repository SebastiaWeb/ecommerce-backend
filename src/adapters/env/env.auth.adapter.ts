import { Injectable } from '@nestjs/common';
// import { AuthPort } from '../../../ports/auth.port';
import * as jwt from 'jsonwebtoken';
import { envConfig } from '../../config/configuration';
import { AuthPort } from 'src/auth/ports/auth.port';

@Injectable()
export class EnvAuthAdapter implements AuthPort {
  async validateCredentials(username: string, password: string): Promise<boolean> {
    console.log('Validating credentials...');
    console.log(`Username: ${username}, Password: ${password}`);
    return username === envConfig.AUTH_USERNAME && 
           password === envConfig.AUTH_PASSWORD;
  }

  generateToken(payload: any): string {
    return jwt.sign(payload, envConfig.JWT_SECRET, { 
      expiresIn: envConfig.JWT_EXPIRES_IN 
    });
  }
}