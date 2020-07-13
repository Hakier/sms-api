import * as Joi from '@hapi/joi';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

const envVarsSchema: Joi.ObjectSchema = Joi.object({
  NODE_ENV: Joi.string()
    .pattern(/^development|production|test$/)
    .default('development'),
  PORT: Joi.number().default(3000),
  CORS_ENABLED: Joi.boolean().required(),
});

type environment = 'development' | 'production' | 'test';

export interface EnvConfig {
  [key: string]: string;
}

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));

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

  /**
   * Ensures all needed variables are set and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const { error, value: validatedEnvConfig } = envVarsSchema.validate(envConfig);

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return validatedEnvConfig;
  }
}
