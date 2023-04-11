import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import { Users } from '../users/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { UpdateUsers1681229129432 } from './migrations/1681229129432-UpdateUsers';

dotenvExpand.expand(dotenv.config());

export const dataSourceConfig = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Users],
  migrations: [UpdateUsers1681229129432],
  synchronize: true,
} as DataSourceOptions;

export default new DataSource(dataSourceConfig);
