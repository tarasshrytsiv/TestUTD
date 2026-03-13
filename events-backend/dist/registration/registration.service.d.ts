import { RegisterEventDto } from '../events/dto/register-event.dto';
export interface EventRegistration extends RegisterEventDto {
    eventId: string;
    createdAt: string;
}
export declare class RegistrationService {
    private readonly storageDir;
    private readonly storageFile;
    private readonly registrations;
    constructor();
    private ensureStorage;
    private loadFromJson;
    private persist;
    exists(eventId: string, email: string): boolean;
    add(eventId: string, dto: RegisterEventDto): EventRegistration;
    findByEvent(eventId: string): EventRegistration[];
}
