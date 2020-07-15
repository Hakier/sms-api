import { Module } from '@nestjs/common';
import { ConfigModule } from '../config';
import { SmsController } from './sms.controller';
import { SmsService } from './sms.service';

@Module({
  imports: [ConfigModule],
  controllers: [SmsController],
  providers: [SmsService],
})
export class SmsModule {}
