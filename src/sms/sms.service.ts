import { Injectable } from '@nestjs/common';
import { IMessage, INewMessage, SmsGateway } from 'smsgateway.me';
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

  async sendMessage(payload: INewMessage): Promise<IMessage> {
    return (await this.gateway.message.send([{ device_id: this.deviceId, ...payload }]))[0];
  }
}
