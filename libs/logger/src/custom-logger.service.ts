import { Injectable, Logger, LoggerService } from '@nestjs/common';

@Injectable()
export class CustomLoggerService extends Logger implements LoggerService {
    constructor(context: string) {
        super(context)
    }
}
