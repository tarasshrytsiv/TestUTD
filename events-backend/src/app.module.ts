import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { EventsModule } from './events/events.module';
import { QueueModule } from './queue/queue.module';
import { RegistrationModule } from './registration/registration.module';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST ?? '127.0.0.1',
        port: Number(process.env.REDIS_PORT ?? 6379),
      },
    }),
    EventsModule,
    RegistrationModule,
    QueueModule,
  ],
})
export class AppModule {}
