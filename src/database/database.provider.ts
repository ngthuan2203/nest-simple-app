import { Sequelize } from 'sequelize-typescript';

import { User } from '@/modules/user/entities/user.entity';

import { DbConfigService } from './config/config.service';
import { SequelizeMeta } from './models/sequelize-meta.entity';

export const databaseProvider = [
  {
    provide: 'SEQUELIZE',
    inject: [DbConfigService],
    useFactory: async (configService: DbConfigService) => {
      const sequelize = new Sequelize(configService.getDbConfig());
      sequelize.addModels([SequelizeMeta, User]);
      return sequelize;
    }
  }
];
