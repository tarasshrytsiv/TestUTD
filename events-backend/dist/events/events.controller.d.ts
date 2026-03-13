import { GetEventsDto } from './dto/get-events.dto';
import { RegisterEventDto } from './dto/register-event.dto';
import { EventsService, RegisterEventResponse } from './events.service';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    getEvents(query: GetEventsDto): import("./events.service").PaginatedEventsResponse;
    getEventById(id: string): import("./data/events.data").EventItem;
    registerForEvent(id: string, body: RegisterEventDto): Promise<RegisterEventResponse>;
}
