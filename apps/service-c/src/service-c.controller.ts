import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { ServiceCService } from './service-c.service';

@Controller()
export class ServiceCController {
  constructor(
    @Inject('REDIS') private redis: ClientProxy,
    private serviceCService: ServiceCService,
  ) {}

  @Get('emit')
  emit(): string {
    this.redis.emit('EMIT_EVENT', {
      sender: 'Service C',
    });

    return 'Event Sent';
  }

  @EventPattern('EMIT_EVENT')
  handle(@Payload() data: { sender: string }) {
    // Evita di processare i propri eventi
    if (data.sender === 'Service C') {
      return;
    }
    
    this.serviceCService.handleEvent(data);
  }
}
