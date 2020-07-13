import { Logger, Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  providers: [
    Logger,
    {
      provide: ConfigService,
      useFactory: (logger: Logger): ConfigService => {
        return new ConfigService(logger, `${process.env.NODE_ENV || ''}.env`);
      },
      inject: [Logger],
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {
}
