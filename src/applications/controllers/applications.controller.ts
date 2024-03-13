import { Controller, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PostApplicationDto, ApplicationResponseDto } from '../dto';
import { ValidateDto, transformToDto } from 'src/utils';
import { Logger } from 'src/decorators';
import { ApplicationsService } from '../services';
import {
  GetApplicationDocs,
  GetApplicationsDocs,
  PostApplicationDocs,
} from '../docs';

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

  @GetApplicationDocs()
  async getOneById(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<ApplicationResponseDto> {
    this.logger.log(`Retrieving application with ID ${id}`);

    const application = await this.applicationsService.getOneById(+id);

    this.logger.verbose(`resolving Application with ID ${application.id}`);

    return transformToDto(application, ApplicationResponseDto);
  }

  @GetApplicationsDocs()
  async getAll(): Promise<ApplicationResponseDto[]> {
    this.logger.log('Retrieving all applications');

    const applications = await this.applicationsService.getAll();
    const data = applications.map((application) =>
      transformToDto(application, ApplicationResponseDto),
    );

    this.logger.verbose(`resolving ${data.length} Applications`);

    return data;
  }
}
