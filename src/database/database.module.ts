import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { DbConfigService } from './config/config.service';
import { SequelizeMeta } from './models/sequelize-meta.entity';
import { databaseProvider } from './database.provider';
import { MigrationService } from './migration.service';

@Module({
  imports: [SequelizeModule.forFeature([SequelizeMeta])],
  providers: [...databaseProvider, DbConfigService, MigrationService],
  exports: [...databaseProvider]
})
export class DatabaseModule {}
