import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ApplicationsModule } from './applications/applications.module';
import { TypeOrmConfig } from './imports';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    TypeOrmConfig.forRootAsync(),
    ApplicationsModule,
  ],
})
export class AppModule {}
