import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { ServiceAService } from './service-a.service';

@Controller()
export class ServiceAController {
  constructor(
    @Inject('REDIS') private redis: ClientProxy,
    private serviceAService: ServiceAService
  ) {}

  @Get('emit')
  emit(): string {
    this.redis.emit('EMIT_EVENT', {
      sender: 'Service A',
    });

    return "Event Sent"
  }

  @EventPattern("EMIT_EVENT")
  handle(@Payload() data: {sender: string}) {
    // Evita di processare i propri eventi
    if (data.sender === 'Service A') {
      return;
    }
    
    this.serviceAService.handleEvent(data);
  }
}
