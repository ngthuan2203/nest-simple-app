import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { HelmetMiddleware } from './helmet/helmet.middleware';

@Module({})
export class MiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HelmetMiddleware).forRoutes('*');
  }
}
