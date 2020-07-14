import { Test, TestingModule } from '@nestjs/testing';
import { InfoController } from './info.controller';
import { AppInfo, InfoService } from './info.service';

describe('Info Controller', () => {
  let controller: InfoController;
  let service: InfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InfoController],
      providers: [InfoService]
    }).compile();

    controller = module.get<InfoController>(InfoController);
    service = module.get<InfoService>(InfoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getInfo', () => {
    let appInfo: AppInfo;
    let appInfoGetterSpy: jest.SpyInstance;

    beforeEach(() => {
      appInfo = {
        name: 'sms-api',
        description: 'some description',
        version: '0.2.0',
      };

      appInfoGetterSpy = jest.spyOn(service, 'appInfo', 'get')
        .mockReturnValue(appInfo);
    });
    it('should return AppInfo from InfoService', () => {
      expect(controller.getInfo()).toBe(appInfo);
      expect(appInfoGetterSpy).toBeCalledTimes(1);
    });
  });
});
