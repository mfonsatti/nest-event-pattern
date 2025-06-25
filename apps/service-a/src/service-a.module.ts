import { Module } from '@nestjs/common';
import { ServiceAController } from './service-a.controller';
import { LoggerModule } from '@app/logger';
import { RedisModule } from '@app/redis';
import { ServiceAService } from './service-a.service';

@Module({
  imports: [LoggerModule.register("Service A"), RedisModule],
  controllers: [ServiceAController],
  providers: [ServiceAService],
})
export class ServiceAModule {}
