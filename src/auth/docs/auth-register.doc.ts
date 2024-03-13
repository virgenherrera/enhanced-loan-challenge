import { HttpCode, HttpStatus, Post, applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';

import { RegisterDto } from '../dto';

export function AuthRegisterDocs() {
  return applyDecorators(
    Post('/register'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({
      description: 'Credentials for registering a new user',
      summary: 'Register a new user',
    }),
    ApiBody({ type: RegisterDto }),
    ApiConflictResponse({ description: 'Username is already taken' }),
    ApiResponse({
      status: HttpStatus.NO_CONTENT,
      description: 'User registered successfully',
    }),
  );
}
