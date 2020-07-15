import { Body, Controller, Post } from '@nestjs/common';
import { NewMessageDto } from './dto/NewMessageDto';
import { SmsService } from './sms.service';

@Controller('')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('/send')
  async send(@Body() newMessageDto: NewMessageDto) {
    return this.smsService.sendMessage(newMessageDto);
  }
}
