import { Queue } from 'bullmq';
import { RegistrationService } from '../registration/registration.service';
import { EventItem } from './data/events.data';
import { GetEventsDto } from './dto/get-events.dto';
import { RegisterEventDto } from './dto/register-event.dto';
export interface PaginatedEventsResponse {
    data: EventItem[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
export interface RegisterEventResponse {
    success: true;
    message: 'Registration successful';
}
export declare class EventsService {
    private readonly registrationService;
    private readonly registrationQueue;
    constructor(registrationService: RegistrationService, registrationQueue: Queue);
    findAll(query: GetEventsDto): PaginatedEventsResponse;
    findOne(id: string): EventItem;
    register(id: string, dto: RegisterEventDto): Promise<RegisterEventResponse>;
}
