import * as Joi from '@hapi/joi';
import { Injectable, Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

const envVarsSchema: Joi.ObjectSchema = Joi.object({
  NODE_ENV: Joi.string()
    .pattern(/^development|production|test$/)
    .default('development'),
  PORT: Joi.number().default(3000),
  CORS_ENABLED: Joi.boolean().required(),
  // /* You can get token from https://smsgateway.me/dashboard/settings */
  SMS_GATEWAY__TOKEN: Joi.string().required(),
  // /* You can get deviceId from https://smsgateway.me/dashboard/devices or by calling gateway.device.search() */
  SMS_GATEWAY__DEVICE_ID: Joi.string().required(),
}).unknown();

type environment = 'development' | 'production' | 'test';

export interface EnvConfig {
  [key: string]: string;
}

@Injectable()
export class ConfigService {
  private static envVarsSchema = envVarsSchema;
  private readonly envConfig: EnvConfig;

  constructor(private readonly logger: Logger, filePath: string) {
    const config = { ...this.readFile(filePath), ...process.env };

    this.envConfig = this.validateInput(config);
  }

  get environment(): environment {
    return this.envConfig.NODE_ENV as environment;
  }

  get port(): number {
    return Number(this.envConfig.PORT);
  }

  get isCorsEnabled(): boolean {
    return Boolean(this.envConfig.CORS_ENABLED);
  }


  get smsGateway(): { token: string, deviceId: number } {
    return {
      token: this.envConfig.SMS_GATEWAY__TOKEN,
      deviceId: Number(this.envConfig.SMS_GATEWAY__DEVICE_ID),
    };
  }

  private readFile(filePath: string) {
    try {
      return dotenv.parse(fs.readFileSync(filePath));
    } catch (err) {
      this.logger.log(`Config file "${filePath}" does not exist or cannot be parsed. Using only ENV`, 'Config');
    }
  }

  /**
   * Ensures all needed variables are set and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const { error, value: validatedEnvConfig } = ConfigService.envVarsSchema.validate(envConfig);

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return validatedEnvConfig;
  }
}
