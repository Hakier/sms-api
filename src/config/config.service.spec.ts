import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { unlinkSync, writeFileSync } from 'fs';
import { ConfigService } from './config.service';

async function createTestingModule(configFilePath: string): Promise<TestingModule> {
  return Test.createTestingModule({
    providers: [
      {
        provide: Logger,
        useValue: { log: jest.fn() },
      },
      {
        provide: ConfigService,
        useFactory: (logger: Logger) => new ConfigService(logger, configFilePath),
        inject: [Logger],
      },
    ],
  }).compile();
}

describe('ConfigService', () => {
  let service: ConfigService;

  describe('when config file exists', () => {
    const configFilePath = 'some_existing_config.env';

    beforeAll(async () => {
      writeFileSync(configFilePath, 'CORS_ENABLED=true\nPORT=444', 'utf8');

      service = (await createTestingModule(configFilePath)).get(ConfigService);
    });
    afterAll(() => {
      unlinkSync(configFilePath);
    });

    it('should construct the service', () => {
      expect(service).toBeDefined();
    });
    it('should import config from file', () => {
      expect(service.isCorsEnabled).toBeTruthy();
      expect(service.port).toBe(444);
    });
  });
  describe('when config file does not exist', () => {
    const notExistingConfigFilePath = 'not_existing_config.env';
    let logger: Logger;

    beforeAll(async () => {
      const module = await createTestingModule(notExistingConfigFilePath);

      service = module.get(ConfigService);
      logger = module.get(Logger);
    });

    it('should construct the service', () => {
      expect(service).toBeDefined();
    });
    it('should report that config file does not exist and using only ENV', () => {
      expect(logger.log).toHaveBeenCalledTimes(1);
      expect(logger.log).toHaveBeenCalledWith(`Config file "${notExistingConfigFilePath}" does not exist or cannot be parsed. Using only ENV`, 'Config');
    });
  });
});
