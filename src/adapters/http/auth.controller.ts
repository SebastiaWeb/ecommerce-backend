// src/adapters/http/auth.controller.ts
import { Controller, Post, Body, Headers, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../auth/application/auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiHeader } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public() // Decorador para marcar la ruta como pública
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns JWT token',
    headers: {
      'Authorization': {
        description: 'Bearer token for authentication',
        example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(
    @Body() body: { username: string; password: string }
  ) {
    console.log('Login attempt:', body.username);
    const token = await this.authService.login(body.username, body.password);
    if (!token) throw new UnauthorizedException('Invalid credentials');
    
    return { access_token: token };
  }

  @Post('protected-route')
  @ApiOperation({ summary: 'Protected route example' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
    example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  @ApiResponse({ status: 200, description: 'Access granted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async protectedRoute(@Headers('authorization') authHeader: string) {
    // Tu lógica para rutas protegidas
    return { message: 'Access granted to protected route' };
  }
}