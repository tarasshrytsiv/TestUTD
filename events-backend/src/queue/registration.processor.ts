import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('registration')
export class RegistrationProcessor extends WorkerHost {
  process(
    job: Job<{
      eventId: string;
      email: string;
      fullName: string;
      phone: string;
      createdAt: string;
    }>,
  ): Promise<void> {
    console.log('Processing registration:', job.data);
    return Promise.resolve();
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job | undefined, error: Error): void {
    console.error('Registration job failed:', {
      jobId: job?.id,
      attemptsMade: job?.attemptsMade,
      error: error.message,
    });
  }
}
