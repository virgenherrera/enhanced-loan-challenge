import { Controller, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ValidateDto } from 'src/utils';
import { RegisterDto } from '../dto';
import { AuthRegisterDocs } from '../docs';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @AuthRegisterDocs()
  async register(@Body(ValidateDto.pipe) body: RegisterDto): Promise<void> {
    console.log(body);

    return;
  }
}
