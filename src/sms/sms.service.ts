import { Injectable } from '@nestjs/common';
import { INewMessage, SmsGateway } from 'smsgateway.me';
import { ConfigService } from '../config';

@Injectable()
export class SmsService {
  private readonly gateway = new SmsGateway(this.token);

  constructor(private readonly config: ConfigService) {}

  private get token(): string {
    return this.config.smsGateway.token;
  }

  private get deviceId(): number {
    return this.config.smsGateway.deviceId;
  }

  async sendMessage(message: INewMessage): Promise<INewMessage> {
    return (await this.gateway.message.send([{ device_id: this.deviceId, ...message }]))[0];
  }
}
