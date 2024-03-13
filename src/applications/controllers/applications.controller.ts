import { Controller, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PostApplicationDto, ApplicationResponseDto } from '../dto';
import { ValidateDto, transformToDto } from 'src/utils';
import { Logger } from 'src/decorators';
import { ApplicationsService } from '../services';
import { PostApplicationDocs } from '../docs';

@ApiTags('applications')
@Controller('applications')
export class ApplicationsController {
  @Logger() private logger: Logger;

  constructor(private readonly applicationsService: ApplicationsService) {}

  @PostApplicationDocs()
  async create(
    @Body(ValidateDto.pipe) body: PostApplicationDto,
  ): Promise<ApplicationResponseDto> {
    this.logger.log(`handling POST /applications`);

    const newApplication = await this.applicationsService.create(body);

    const data = transformToDto(newApplication, ApplicationResponseDto);

    this.logger.verbose(`Application with id: "${data.id}" was created`);

    return data;
  }
}
