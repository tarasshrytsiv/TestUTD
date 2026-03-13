import { Module } from '@nestjs/common';
import { QueueModule } from '../queue/queue.module';
import { RegistrationModule } from '../registration/registration.module';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  imports: [RegistrationModule, QueueModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
