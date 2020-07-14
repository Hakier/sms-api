import { Test, TestingModule } from '@nestjs/testing';
import { AppInfo, InfoService } from './info.service';

describe('InfoService', () => {
  let service: InfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InfoService],
    }).compile();

    service = module.get<InfoService>(InfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when invoked get appInfo', () => {
    it('should return AppInfo', () => {
      expect(service.appInfo).toEqual(expect.objectContaining({
        name: expect.any(String),
        description: expect.any(String),
        version: expect.any(String),
      } as AppInfo));
    });
  });
});
