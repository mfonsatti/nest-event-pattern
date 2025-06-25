import { Module } from '@nestjs/common';
import { ServiceCController } from './service-c.controller';
import { LoggerModule } from '@app/logger';
import { RedisModule } from '@app/redis';
import { ServiceCService } from './service-c.service';

@Module({
  imports: [LoggerModule.register("Service C"), RedisModule],
  controllers: [ServiceCController],
  providers: [ServiceCService],
})
export class ServiceCModule {}
