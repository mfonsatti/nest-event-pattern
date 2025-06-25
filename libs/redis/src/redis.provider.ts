import { Provider } from "@nestjs/common";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";

export const RedisProvider: Provider = {
    provide: 'REDIS',
    useFactory: () => {
        return ClientProxyFactory.create({
            transport: Transport.REDIS,
            options: {
                host: '127.0.0.1',
                port: 6379,
                // db: 0,
                // retryAttempts: 5,
                // retryDelay: 3000,
            }
        })
    }
}