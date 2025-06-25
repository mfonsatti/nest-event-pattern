import { CustomLoggerService } from '@app/logger';
import { Injectable } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Injectable()
export class ServiceBService {
  constructor(private logger: CustomLoggerService) {}

  handleEvent(@Payload() data: { sender: string }) {
    this.logger.debug("🎉 Received event from " + data.sender);
  }
}
