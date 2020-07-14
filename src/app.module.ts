import { Logger, Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from './config';
import { InfoModule } from './info/info.module';

@Module({
  imports: [ConfigModule, InfoModule],
  providers: [AppService, Logger],
})
export class AppModule {}
