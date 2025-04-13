import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginRequest } from '../dto/login.request';
import { LoginResponse } from '../dto/login.response';

export function AuthSwaggerDecorator() {
  return applyDecorators(
    ApiTags('Authentication'),
    ApiOperation({ summary: 'User login' }),
    ApiBody({ type: LoginRequest }),
    ApiResponse({ 
      status: 200, 
      description: 'Successful login',
      type: LoginResponse,
    }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
  );
}