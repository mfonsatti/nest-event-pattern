import { NestFactory } from '@nestjs/core';
import { ServiceBModule } from './service-b.module';
import { CustomLoggerService } from '@app/logger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ServiceBModule, { logger: ['debug'] });
  const logger = app.get(CustomLoggerService);
  app.setGlobalPrefix('b');
  await app.listen(3002);
  logger.debug('Service B listening on 3002');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: { host: '127.0.0.1', port: 6379 },
  });

  await app.startAllMicroservices();
  logger.debug('Service B Redis Ready');
}
bootstrap();
