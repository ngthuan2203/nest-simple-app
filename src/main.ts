import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { IConfigs } from './common/interfaces';
import { ApplicationSetup } from './common/shared/app-setup';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const { port } = configService.get<IConfigs['app']>('app');
  const appSetup = new ApplicationSetup(app);
  appSetup.setupGlobals();
  await appSetup.setupDocument();

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/`);
}
bootstrap();
