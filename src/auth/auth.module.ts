import { Module } from '@nestjs/common';

import { AuthController } from './controllers';

@Module({
  controllers: [AuthController],
})
export class AuthModule {}
