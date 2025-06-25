import { DynamicModule, Module } from '@nestjs/common';
import { CustomLoggerService } from './custom-logger.service';

@Module({})
export class LoggerModule {
  static register(context: string): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        {
          provide: CustomLoggerService,
          useFactory: () => new CustomLoggerService(context),
        },
      ],
      exports: [CustomLoggerService],
    };
  }
}
