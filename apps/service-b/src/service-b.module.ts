import { Module } from '@nestjs/common';
import { ServiceBController } from './service-b.controller';
import { ServiceBService } from './service-b.service';
import { LoggerModule } from '@app/logger';
import { RedisModule } from '@app/redis';

@Module({
  imports: [LoggerModule.register("Service B"), RedisModule],
  controllers: [ServiceBController],
  providers: [ServiceBService],
})
export class ServiceBModule {}
