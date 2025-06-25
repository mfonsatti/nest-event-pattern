import { NestFactory } from '@nestjs/core';
import { ServiceAModule } from './service-a.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CustomLoggerService } from '@app/logger';

async function bootstrap() {
  const app = await NestFactory.create(ServiceAModule, { logger: ['debug'] });
  const logger = app.get(CustomLoggerService);
  app.setGlobalPrefix('a');
  await app.listen(3001);
  logger.debug('Service A listening on 3001');

  // Listener Redis as Consumer
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: '127.0.0.1',
      port: 6379,
      db: 0,
      retryAttempts: 5,
      retryDelay: 3000,
    },
  });

  await app.startAllMicroservices();
  logger.debug('Service A Redis Ready');
}
bootstrap();
