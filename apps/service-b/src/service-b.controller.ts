import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { ServiceBService } from './service-b.service';

@Controller()
export class ServiceBController {
  constructor(
    @Inject('REDIS') private redis: ClientProxy,
    private serviceBService: ServiceBService,
  ) {}

  @Get('emit')
  emit(): string {
    this.redis.emit('EMIT_EVENT', {
      sender: 'Service B',
    });

    return 'Event sent';
  }

  @EventPattern('EMIT_EVENT')
  handle(@Payload() data: { sender: string }) {
    // Evita di processare i propri eventi
    if (data.sender === 'Service B') {
      return;
    }
    
    this.serviceBService.handleEvent(data);
  }
}
