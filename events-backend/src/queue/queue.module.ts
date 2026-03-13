import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { RegistrationProcessor } from './registration.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'registration',
    }),
  ],
  providers: [RegistrationProcessor],
  exports: [BullModule],
})
export class QueueModule {}
