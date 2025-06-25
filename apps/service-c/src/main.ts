import { NestFactory } from '@nestjs/core';
import { ServiceCModule } from './service-c.module';
import { CustomLoggerService } from '@app/logger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ServiceCModule, { logger: ['debug'] });
  const logger = app.get(CustomLoggerService);
  app.setGlobalPrefix('c');
  await app.listen(3003);
  logger.debug('Service C listening on 3003');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: { host: '127.0.0.1', port: 6379 },
  });

  await app.startAllMicroservices();
  logger.debug('Service C Redis Ready');
}
bootstrap();
