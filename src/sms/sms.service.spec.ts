import { Test, TestingModule } from '@nestjs/testing';
import { IMessage, INewMessage, SmsGateway } from 'smsgateway.me';
import { MessageApi } from 'smsgateway.me/dist/lib/api';
import { mocked } from 'ts-jest/utils';
import { ConfigService } from '../config';
import { SmsService } from './sms.service';

jest.mock('smsgateway.me');

async function configureTestingModule(): Promise<TestingModule> {
  return Test.createTestingModule({
    providers: [
      SmsService,
      {
        provide: ConfigService,
        useValue: {
          smsGateway: {
            token: 'smsGateway.token',
            deviceId: 'smsGateway.deviceId',
          },
        },
      },
    ],
  }).compile();
}

describe('SmsService', () => {
  const MockedSmsGateway = mocked(SmsGateway, true);
  let service: SmsService;

  beforeAll(async () => {
    service = (await configureTestingModule()).get(SmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should construct SmsGateway with token from ConfigService', () => {
    expect(SmsGateway).toBeCalledTimes(1);
    expect(SmsGateway).toBeCalledWith('smsGateway.token');
  });

  describe('when invoked sendMessage', () => {
    let messageSendSpy: jest.SpyInstance;
    let messageApiMock: Partial<MessageApi>;
    let firstMessageSendResponse: IMessage;

    beforeAll(async () => {
      firstMessageSendResponse = {
        id: 1,
        status: 'pending',
        created_at: '2020-07-15T15:17:39+00:00',
        updated_at: '2020-07-15T15:17:39+00:00',
        log: [],
        device_id: 123,
        phone_number: '987654321',
        message: 'some message',
      };
      messageSendSpy = jest.fn().mockResolvedValue([
        firstMessageSendResponse,
        { dummy: 'should not use it' },
      ]);
      messageApiMock = ({
        send: messageSendSpy as any,
      } as Partial<MessageApi>);
    });

    describe('without deviceId in payload', () => {
      let payload: INewMessage;
      let response: INewMessage;

      beforeAll(async () => {
        MockedSmsGateway.mockReset();
        messageSendSpy.mockClear();
        MockedSmsGateway.mockImplementation(() => ({
          message: messageApiMock,
        } as any));
        payload = {
          phone_number: '123456789',
          message: 'some message to send',
        };
        service = (await configureTestingModule()).get(SmsService);

        response = await service.sendMessage(payload);
      });

      it('should use given payload with deviceId from ConfigService to send one message', () => {
        expect(messageSendSpy).toBeCalledTimes(1);
        expect(messageSendSpy).toBeCalledWith([
          {
            device_id: 'smsGateway.deviceId' as any,
            phone_number: '123456789',
            message: 'some message to send',
          } as INewMessage,
        ]);
      });
      it('should resolve with IMessage', () => {
        expect(response).toBe(firstMessageSendResponse);
      });
    });
    describe('with deviceId in payload', () => {
      let payload: INewMessage;
      let response: INewMessage;

      beforeAll(async () => {
        MockedSmsGateway.mockReset();
        messageSendSpy.mockClear();
        MockedSmsGateway.mockImplementation(() => ({
          message: messageApiMock,
        } as any));
        payload = {
          device_id: 404,
          phone_number: '123456789',
          message: 'some message to send',
        };
        service = (await configureTestingModule()).get(SmsService);

        response = await service.sendMessage(payload);
      });

      it('should use given payload to send one message', () => {
        expect(messageSendSpy).toBeCalledTimes(1);
        expect(messageSendSpy).toBeCalledWith([payload]);
      });
      it('should resolve with IMessage', () => {
        expect(response).toBe(firstMessageSendResponse);
      });
    });
  });
});
