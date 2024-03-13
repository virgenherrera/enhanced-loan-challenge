import { applyDecorators, Post } from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { PostApplicationDto, ApplicationResponseDto } from '../dto';

export function PostApplicationDocs() {
  return applyDecorators(
    Post(),
    ApiOperation({ summary: 'Create a new loan application' }),
    ApiBody({ type: PostApplicationDto, description: 'The application data' }),
    ApiCreatedResponse({
      description: 'The Application has been successfully created.',
      type: ApplicationResponseDto,
    }),
    ApiBadRequestResponse({
      description: 'Invalid request data',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 400 },
          message: { type: 'string', example: 'Validation failed' },
          errors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                property: { type: 'string', example: 'examplePropertyName' },
                constraints: {
                  type: 'object',
                  additionalProperties: {
                    type: 'string',
                  },
                  example: {
                    isNotEmpty: 'examplePropertyName should not be empty',
                    isString: 'examplePropertyName must be a string',
                    whitelistValidation:
                      'property examplePropertyName should not exist',
                  },
                },
              },
            },
          },
        },
      },
    }),
  );
}
