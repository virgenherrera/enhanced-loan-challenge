import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getOneById(id: number): Promise<Application> {
    const application = await this.applicationRepository.findOneBy({ id });

    if (!application) {
      this.logger.warn(`Application with id: "${id}" was not found.`);

      throw new NotFoundException(
        `Application with id: '${id}' was not found.`,
      );
    }

    this.logger.verbose(`Retrieved Application with id: "${id}".`);
    return application;
  }

  async getAll(): Promise<Application[]> {
    this.logger.log('Retrieving all applications.');

    const applications = await this.applicationRepository.find();

    this.logger.verbose(`Retrieved ${applications.length} applications.`);

    return applications;
  }
}
