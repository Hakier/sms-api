import { Test, TestingModule } from '@nestjs/testing';
import { IMessage, INewMessage } from 'smsgateway.me';
import { SmsController } from './sms.controller';
import { SmsService } from './sms.service';

describe('Sms Controller', () => {
  let controller: SmsController;
  let serviceMock: SmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SmsController],
      providers: [
        { provide: SmsService, useValue: {} },
      ],
    }).compile();

    controller = module.get<SmsController>(SmsController);
    serviceMock = module.get<SmsService>(SmsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('send', () => {
    let payload: INewMessage;
    let sendMessageResult: IMessage;
    let response: IMessage;

    beforeAll(() => {
      payload = {
        device_id: 652,
        phone_number: '789456123',
        message: 'some message',
      };
      sendMessageResult = {
        id: 2,
        status: 'pending',
        created_at: '2020-07-15T16:13:39+00:00',
        updated_at: '2020-07-15T16:13:39+00:00',
        log: [],
        device_id: 123,
        phone_number: '654321987',
        message: 'another message',
      };
    });
    beforeEach(async () => {
      serviceMock.sendMessage = jest.fn().mockResolvedValue(sendMessageResult) as any;

      response = await controller.send(payload);
    });

    it('should invoke sendMessage from SmsService with received NewMessageDto', () => {
      expect(serviceMock.sendMessage).toBeCalledTimes(1);
      expect(serviceMock.sendMessage).toBeCalledWith(payload);
    });
    it('should resolve with value from sendMessage', () => {
      expect(response).toBe(sendMessageResult);
    });
  });
});
