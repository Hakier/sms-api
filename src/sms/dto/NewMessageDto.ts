import { INewMessage } from 'smsgateway.me';

export class NewMessageDto implements INewMessage {
  device_id?: number;
  phone_number: string;
  message: string;
}
