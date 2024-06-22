import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { MiddlewareModule } from './common/middlewares/middlewares.module';
import { DbConfigService } from './database/config/config.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import configs from './configs';

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forRootAsync({
      useClass: DbConfigService
    }),
    ConfigModule.forRoot({ isGlobal: true, load: configs }),
    UserModule,
    MiddlewareModule
  ]
})
export class AppModule {}
