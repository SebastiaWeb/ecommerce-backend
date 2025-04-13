import { Controller, Post, Body } from '@nestjs/common';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { LoginRequest } from '../dto/login.request';
import { LoginResponse } from '../dto/login.response';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  async login(@Body() body: LoginRequest): Promise<LoginResponse> {
    const { token } = await this.loginUseCase.execute(body.email, body.password);
    return { token };
  }
}