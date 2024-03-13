import { Get, applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';

import { ApplicationResponseDto } from '../dto';

export function GetApplicationsDocs() {
  return applyDecorators(
    Get(),
    ApiOperation({ summary: 'Get all loan applications' }),
    ApiOkResponse({
      description: 'Loan applications were successfully retrieved.',
      type: ApplicationResponseDto,
      isArray: true,
    }),
  );
}
