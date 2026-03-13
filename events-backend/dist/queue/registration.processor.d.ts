import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
export declare class RegistrationProcessor extends WorkerHost {
    process(job: Job<{
        eventId: string;
        email: string;
        fullName: string;
        phone: string;
        createdAt: string;
    }>): Promise<void>;
    onFailed(job: Job | undefined, error: Error): void;
}
