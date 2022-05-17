import { CacheModule, MiddlewareConsumer, Module } from '@nestjs/common';
import { ResourceHandlerMiddleware } from './resource-handler.middleware';

@Module({
  imports: [
    CacheModule.register({
      ttl: 60 * 60,
      max: 100,
    }),
  ],
})
export class ViewModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(ResourceHandlerMiddleware).forRoutes('/');
  }
}
