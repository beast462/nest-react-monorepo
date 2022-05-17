import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import ConfigModule, { ConfigKeys } from './base/config.module';
import { ViewModule } from './view/view.module';

@Module({
  imports: [ConfigModule, ViewModule],
})
export class AppModule {
  private readonly logger: Logger = new Logger('AppModule');

  public constructor(configService: ConfigService) {
    const port = configService.get<number>(ConfigKeys.SERVER_PORT);

    this.logger.log(`Server listening on port ${port}`);
  }
}
