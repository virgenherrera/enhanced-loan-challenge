import { Module } from '@nestjs/common';

import { ApplicationsController } from './controllers';

@Module({
  controllers: [ApplicationsController],
})
export class ApplicationsModule {}
