import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { IConfigs } from '@/common/interfaces';

export class ApplicationSetup {
  private app: INestApplication;

  constructor(app: INestApplication) {
    this.app = app;
  }

  setupGlobals() {
    const configService = this.app.get(ConfigService);
    const {
      cors: { allowHeaders, allowMethods, allowOrigin }
    } = configService.get<IConfigs['middlewares']>('middlewares');

    this.app.enableCors({
      credentials: true,
      origin: allowOrigin,
      methods: allowMethods,
      allowedHeaders: allowHeaders
    });
    this.app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: false,
        skipNullProperties: false,
        skipUndefinedProperties: false,
        skipMissingProperties: false,
        validationError: { target: false },
        transformOptions: { enableImplicitConversion: true }
      })
    );
    this.app.setGlobalPrefix('/api');
  }

  async setupDocument() {
    const configService = this.app.get(ConfigService);
    const { documentationEnable } = configService.get<IConfigs['app']>('app');
    if (documentationEnable) {
      const config = new DocumentBuilder()
        .setTitle('Nest Backend API')
        .build();
      const document = SwaggerModule.createDocument(this.app, config);
      SwaggerModule.setup('swagger', this.app, document);
    }
  }
}
