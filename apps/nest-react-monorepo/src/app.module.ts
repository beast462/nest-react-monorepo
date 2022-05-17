import { Module } from '@nestjs/common';
import ConfigModule from './base/config.module';
import { ViewModule } from './view/view.module';

@Module({
  imports: [ConfigModule, ViewModule],
})
export class AppModule {}
