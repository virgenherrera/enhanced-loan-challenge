import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Repository } from 'typeorm';

import { Logger } from 'src/decorators';
import { RegisterDto } from '../dto';

@Injectable()
export class AuthService {
  @Logger() private logger: Logger;

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async register(dto: RegisterDto): Promise<User> {
    this.logger.log(`persisting a new User to DB.`);

    const existingUser = await this.getUserByUsername(dto.username);

    if (existingUser) {
      this.logger.warn(`Username "${dto.username}" is already taken.`);
      throw new ConflictException(
        `Username "${dto.username}" is already taken.`,
      );
    }

    const newUser = this.usersRepository.create(dto);

    await this.usersRepository.save(newUser);

    this.logger.verbose(`User "${newUser.username}" was persisted `);

    return newUser;
  }

  private async getUserByUsername(username: string): Promise<User | null> {
    this.logger.log(`attempting to find User with username: "${username}".`);

    const user = await this.usersRepository.findOne({
      where: { username },
    });
    const logMsg = !user
      ? `User with username: "${username}" does not exist.`
      : `User with username: "${username}" was found.`;

    this.logger.verbose(logMsg);

    return user;
  }
}
