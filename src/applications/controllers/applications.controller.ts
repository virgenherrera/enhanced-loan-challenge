import { Controller, Post, Body } from '@nestjs/common';

import { PostApplicationDto, ApplicationResponseDto } from '../dto';
import { ValidateDto, transformToDto } from 'src/utils';
import { Logger } from 'src/decorators';

@Controller('applications')
export class ApplicationsController {
  @Logger() private logger: Logger;

  @Post()
  create(
    @Body(ValidateDto.pipe) body: PostApplicationDto,
  ): ApplicationResponseDto {
    this.logger.log(`handling POST /applications`);

    const foo = transformToDto(
      { ...body, id: 1, createdAt: new Date(), updatedAt: new Date() },
      ApplicationResponseDto,
    );

    console.log(foo, foo instanceof PostApplicationDto);

    return foo;
  }
}
