import { Logger, Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from './config';

@Module({
  imports: [ConfigModule],
  providers: [AppService, Logger],
})
export class AppModule {}
