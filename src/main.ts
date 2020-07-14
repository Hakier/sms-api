import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const logger: Logger = app.get(Logger);

  if (config.isCorsEnabled) {
    app.enableCors();
    logger.log(`CORS Enabled`, 'Bootstrap');
  }

  await app.listen(config.port);
  logger.log(`Server listen on: ${await app.getUrl()}`, 'Bootstrap');
}
void bootstrap();
