import { Controller, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ValidateDto } from 'src/utils';
import { LoginDto, LoginResponseDto, RegisterDto } from '../dto';
import { Logger } from 'src/decorators';
import { AuthLoginDocs, AuthRegisterDocs } from '../docs';
import { AuthService } from '../services';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @Logger() private logger: Logger;

  constructor(private readonly authService: AuthService) {}

  @AuthRegisterDocs()
  async register(@Body(ValidateDto.pipe) body: RegisterDto): Promise<void> {
    this.logger.log('Starting user registration process.');

    try {
      const newUser = await this.authService.register(body);

      this.logger.verbose(
        `User "${newUser.username}" registered successfully.`,
      );
    } catch (error) {
      this.logger.error(`Registration failed: ${error.message}`);

      throw error;
    }
  }

  @AuthLoginDocs()
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    this.logger.log(`Login attempt for user: ${loginDto.username}`);

    const data = await this.authService.login(loginDto);

    this.logger.verbose(`Login successful for user: ${loginDto.username}`);

    return data;
  }
}
