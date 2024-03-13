import { Module } from '@nestjs/common';
import { ApplicationsModule } from './applications/applications.module';

@Module({
  imports: [ApplicationsModule],
})
export class AppModule {}
