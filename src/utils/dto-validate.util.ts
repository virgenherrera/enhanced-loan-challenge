import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidateDto implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);
    const errors = await validate(object, {
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    });

    if (errors.length > 0) {
      const detailedErrors = errors.map((error) => ({
        property: error.property,
        constraints: error.constraints,
      }));

      throw new BadRequestException({
        statusCode: 400,
        message: 'Validation failed',
        errors: detailedErrors,
      });
    }

    return object;
  }

  private toValidate(metatype: ArgumentMetadata['metatype']): boolean {
    const types = [
      String,
      Boolean,
      Number,
      Array,
      Object,
    ] as ArgumentMetadata['metatype'][];
    return !types.includes(metatype);
  }

  static get pipe() {
    return new ValidateDto();
  }
}
