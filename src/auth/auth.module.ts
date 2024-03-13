import { Module } from '@nestjs/common';

import { AuthController } from './controllers';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/entities';
import { AuthService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
