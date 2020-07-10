import { Logger, Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from './config';
import { InfoModule } from './info/info.module';
import { SmsModule } from './sms';

@Module({
  imports: [ConfigModule, InfoModule, SmsModule],
  providers: [AppService, Logger],
})
export class AppModule {}
