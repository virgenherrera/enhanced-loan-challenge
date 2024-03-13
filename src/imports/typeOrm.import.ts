import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

export class TypeOrmConfig {
  static forRootAsync() {
    return TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get('DB_USERNAME');
        const password = configService.get('DB_PASSWORD');
        const database = configService.get('DB_NAME');
        const host = configService.get('DB_HOST');
        const port = configService.get('DB_PORT');

        if (!username)
          throw new Error('Unable to find "DB_USERNAME" environment variable');
        if (!password)
          throw new Error('Unable to find "DB_PASSWORD" environment variable');
        if (!database)
          throw new Error('Unable to find "DB_NAME" environment variable');
        if (!host)
          throw new Error('Unable to find "DB_HOST" environment variable');
        if (!port)
          throw new Error('Unable to find "DB_PORT" environment variable');

        const entityMap = await import('../entities');
        const entities = Object.values(entityMap);
        const options: TypeOrmModuleOptions = {
          type: 'postgres',
          name: 'default',
          logging: 'all',
          username,
          password,
          database,
          host,
          port,
          synchronize: true,
          entities,
        };

        return options;
      },
      inject: [ConfigService],
    });
  }
}
