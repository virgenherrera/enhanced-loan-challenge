import { Get, applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiParam,
} from '@nestjs/swagger';

import { ApplicationResponseDto } from '../dto';

export function GetApplicationDocs() {
  return applyDecorators(
    Get(':id'),
    ApiOperation({ summary: 'Get a loan application by ID' }),
    ApiOkResponse({
      description: 'The loan application was successfully retrieved.',
      type: ApplicationResponseDto,
    }),
    ApiNotFoundResponse({ description: 'Loan application not found.' }),
    ApiBadRequestResponse({ description: 'Invalid ID format' }),
    ApiParam({
      name: 'id',
      required: true,
      description: 'The ID of the loan application',
      type: 'integer',
    }),
  );
}
