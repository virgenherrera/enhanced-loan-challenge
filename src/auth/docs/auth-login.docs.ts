import { Post, applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

import { LoginDto } from '../dto';

export function AuthLoginDocs() {
  return applyDecorators(
    Post('/login'),
    ApiOperation({ summary: 'User login' }),
    ApiBody({ type: LoginDto }),
    ApiResponse({ status: 200, description: 'User logged in successfully' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
  );
}
