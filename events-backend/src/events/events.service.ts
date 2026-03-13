import { InjectQueue } from '@nestjs/bullmq';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Queue } from 'bullmq';
import { RegistrationService } from '../registration/registration.service';
import { EVENTS_DATA, EventItem } from './data/events.data';
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

@Injectable()
export class EventsService {
  constructor(
    private readonly registrationService: RegistrationService,
    @InjectQueue('registration')
    private readonly registrationQueue: Queue,
  ) {}

  findAll(query: GetEventsDto): PaginatedEventsResponse {
    const requestedPage = query.page ?? 1;
    const limit = query.limit ?? 5;
    const search = query.search?.trim().toLowerCase();
    const dateFrom = query.dateFrom ? new Date(query.dateFrom) : undefined;
    const dateTo = query.dateTo ? new Date(query.dateTo) : undefined;

    const filtered = EVENTS_DATA.filter((event) => {
      const eventDate = new Date(event.date);

      if (search) {
        const haystack =
          `${event.title} ${event.location} ${event.shortDescription} ${event.description}`.toLowerCase();
        if (!haystack.includes(search)) {
          return false;
        }
      }

      if (dateFrom && eventDate < dateFrom) {
        return false;
      }

      if (dateTo && eventDate > dateTo) {
        return false;
      }

      return true;
    });

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const page = Math.min(Math.max(requestedPage, 1), totalPages);
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages,
    };
  }

  findOne(id: string): EventItem {
    const event = EVENTS_DATA.find((item) => item.id === id);

    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    return event;
  }

  async register(
    id: string,
    dto: RegisterEventDto,
  ): Promise<RegisterEventResponse> {
    const event = this.findOne(id);

    if (this.registrationService.exists(event.id, dto.email)) {
      throw new ConflictException(
        'This email is already registered for the selected event',
      );
    }

    const registration = this.registrationService.add(event.id, dto);

    await this.registrationQueue.add(
      'process-registration',
      {
        eventId: event.id,
        email: registration.email,
        fullName: registration.fullName,
        phone: registration.phone,
        createdAt: registration.createdAt,
      },
      {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      },
    );

    return {
      success: true,
      message: 'Registration successful',
    };
  }
}
