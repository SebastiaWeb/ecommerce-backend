// src/adapters/http/dto/login.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ 
    example: 'admin', 
    description: 'The username for login',
    required: true
  })
  username: string;

  @ApiProperty({ 
    example: 'secret123', 
    description: 'The password for login',
    required: true,
    format: 'password'
  })
  password: string;
}