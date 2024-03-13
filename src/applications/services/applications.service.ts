import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Application } from '../../entities';
import { Logger } from 'src/decorators';
import { PostApplicationDto } from '../dto';

@Injectable()
export class ApplicationsService {
  @Logger() private logger: Logger;

  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}

  async create(postApplicationDto: PostApplicationDto): Promise<Application> {
    this.logger.log(`persisting a new Application to DB.`);

    const newApplication =
      this.applicationRepository.create(postApplicationDto);
    await this.applicationRepository.save(newApplication);

    this.logger.verbose(
      `Application was persisted with id: "${newApplication.id}" and creation Timestamp of: "${newApplication.createdAt}"`,
    );

    return newApplication;
  }
}
