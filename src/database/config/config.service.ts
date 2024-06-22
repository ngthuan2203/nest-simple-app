import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory
} from '@nestjs/sequelize';

import { IConfigs } from '@/common/interfaces';

import { EnvEnum } from '@/common/constants';

@Injectable()
export class DbConfigService implements SequelizeOptionsFactory {
  constructor(private configService: ConfigService) {}
  createSequelizeOptions():
    | SequelizeModuleOptions
    | Promise<SequelizeModuleOptions> {
    return this.getDbConfig();
  }

  getDbConfig() {
    const env = this.configService.get<string>(EnvEnum.NODE_ENV);

    const databaseConfig =
      this.configService.get<IConfigs['database']>('database');
    const dbConfig = {
      local: {
        username: databaseConfig.username,
        password: databaseConfig.password,
        database: databaseConfig.name,
        host: databaseConfig.host,
        dialect: 'mysql',
        dialectOptions: {
          connectTimeout: 15000
        },
        define: {
          timestamps: false
        },
        logging: true
      },
      dev: {
        username: databaseConfig.username,
        password: databaseConfig.password,
        database: databaseConfig.name,
        host: databaseConfig.host,
        dialect: 'mysql',
        dialectOptions: {
          connectTimeout: 15000
        },
        define: {
          timestamps: false
        },
        logging: true
      }
    };
    const config: SequelizeModuleOptions = {
      ...dbConfig[env]
    };
    return config;
  }
}
