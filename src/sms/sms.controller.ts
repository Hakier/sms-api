import { Controller, Get, Param } from '@nestjs/common';
import { IMessage } from 'smsgateway.me';
import { SmsService } from './sms.service';

@Controller('')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Get('send/:phoneNumber/:message')
  async sendMessage(@Param('phoneNumber') phoneNumber: string, @Param('message') message: string) {
    return this.smsService.sendMessage({
      phone_number: phoneNumber,
      message,
    });
  }
}
