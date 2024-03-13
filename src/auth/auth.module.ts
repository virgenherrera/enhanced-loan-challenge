import { Module } from '@nestjs/common';

import { AuthController } from './controllers';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/entities';
import { AuthService } from './services';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey', // Usa una clave secreta adecuada
      signOptions: { expiresIn: '60s' }, // Configura la expiración según tus necesidades
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
