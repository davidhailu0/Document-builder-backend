import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1234',
  database: 'documentation_builder',
  entities: [__dirname + '../**/*.entity.ts'],
  synchronize: true,
  autoLoadEntities: true
}