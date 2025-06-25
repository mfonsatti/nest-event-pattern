import { CustomLoggerService } from '@app/logger';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceCService {
  constructor(private logger: CustomLoggerService) {}

  handleEvent(data: {sender: string}) {
    this.logger.debug("🎉 Received event from " + data.sender);
  }
}