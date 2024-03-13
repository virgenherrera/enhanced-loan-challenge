import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { Logger } from 'src/decorators';
import { LoginDto, LoginResponseDto, RegisterDto } from '../dto';
import { transformToDto, validateRawAndHash } from 'src/utils';

@Injectable()
export class AuthService {
  @Logger() private logger: Logger;

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
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

  async login({ username, password }: LoginDto): Promise<LoginResponseDto> {
    this.logger.log(`attempting to register username: ${username} `);

    const user = await this.getUserByUsername(username);

    if (user && validateRawAndHash(password, user.password)) {
      this.logger.verbose(`Login successful for user: ${user.username}`);
      const access_token = await this.generateJwt(user);

      return transformToDto({ access_token }, LoginResponseDto);
    } else {
      this.logger.warn(`Invalid login attempt for user: ${username}`);
      throw new UnauthorizedException('Invalid login credentials');
    }
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

  private async generateJwt(user: User): Promise<string> {
    this.logger.log(`Generating JWT for user: ${user.username}`);

    const payload = { username: user.username, sub: user.id, role: user.role };

    return this.jwtService.signAsync(payload);
  }
}
