import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { includes, some } from 'lodash';
import * as path from 'path';
import { QueryTypes, Sequelize } from 'sequelize';

import { DbConfigService } from './config/config.service';
import { SequelizeMeta } from './models/sequelize-meta.entity';
import migrationFileNames from './migrations';
import seederFileNames from './seeders';

@Injectable()
export class MigrationService implements OnApplicationBootstrap {
  constructor(
    @Inject('SEQUELIZE')
    private sequelize: Sequelize,

    private configService: ConfigService,
    private dbConfigService: DbConfigService
  ) {}

  async onApplicationBootstrap() {
    // migrateDatabase(this.sequelizeMeta);
    const dbConfig = this.dbConfigService.getDbConfig();
    const sequelizeEmptyDadabse = new Sequelize(
      '',
      dbConfig.username,
      dbConfig.password,
      {
        ...dbConfig,
        database: ''
      }
    );
    await sequelizeEmptyDadabse.query(
      `CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`
    );

    const migrations = migrationFileNames;
    // get list in BD table SequelizeMeta
    let completedMigrations = [];
    try {
      completedMigrations = await SequelizeMeta.findAll({
        raw: true,
        attributes: ['name']
      });
    } catch (error) {
      if (
        includes(
          error?.toString(),
          `Table '${dbConfig.database}.sequelizemeta' doesn't exist`
        ) ||
        includes(
          error?.toString(),
          `Table '${dbConfig.database}.SequelizeMeta' doesn't exist`
        )
      ) {
        completedMigrations = [];
      } else {
        throw error;
      }
    }

    for (const name in completedMigrations) {
      if (completedMigrations.hasOwnProperty(name)) {
        const index = migrations.indexOf(completedMigrations[name].name);
        if (index !== -1) {
          // if migration is alreay completed remvove it from the list from migrations folder
          migrations.splice(index, 1);
        }
      }
    }

    const queryInterface = this.sequelize.getQueryInterface();
    try {
      for (let i = 0, c = migrations.length; i < c; i++) {
        const migrationPath = path.join(__dirname, 'migrations', migrations[i]);
        const migration = await import(migrationPath);
        await migration.up(queryInterface, this.sequelize);
        await this.sequelize.query(
          'INSERT INTO `SequelizeMeta` VALUES(:name)',
          {
            type: QueryTypes.INSERT,
            replacements: { name: migrations[i] }
          }
        );
      }
    } catch (error) {
      console.error(error);
      throw error;
    }

    // seed data
    try {
      const seeders = seederFileNames;
      for (let i = 0, c = seeders.length; i < c; i++) {
        if (!some(completedMigrations, (c) => c.name === seeders[i])) {
          const seederPath = path.join(__dirname, 'seeders', seeders[i]);
          const seed = await import(seederPath);
          await seed.up(queryInterface, this.sequelize);
          await this.sequelize.query(
            'INSERT INTO `SequelizeMeta` VALUES(:name)',
            {
              type: QueryTypes.INSERT,
              replacements: { name: seeders[i] }
            }
          );
        }
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
