import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { RegisterEventDto } from '../events/dto/register-event.dto';

export interface EventRegistration extends RegisterEventDto {
  eventId: string;
  createdAt: string;
}

@Injectable()
export class RegistrationService {
  private readonly storageDir = join(process.cwd(), 'data');
  private readonly storageFile = join(this.storageDir, 'registrations.json');
  private readonly registrations: EventRegistration[] = [];

  constructor() {
    this.ensureStorage();
    this.loadFromJson();
  }

  private ensureStorage(): void {
    if (!existsSync(this.storageDir)) {
      mkdirSync(this.storageDir, { recursive: true });
    }

    if (!existsSync(this.storageFile)) {
      writeFileSync(this.storageFile, '[]', 'utf-8');
    }
  }

  private loadFromJson(): void {
    try {
      const raw = readFileSync(this.storageFile, 'utf-8');
      const parsed = JSON.parse(raw) as EventRegistration[];
      this.registrations.push(...parsed);
    } catch {
      this.registrations.length = 0;
      writeFileSync(this.storageFile, '[]', 'utf-8');
    }
  }

  private persist(): void {
    writeFileSync(
      this.storageFile,
      JSON.stringify(this.registrations, null, 2),
      'utf-8',
    );
  }

  exists(eventId: string, email: string): boolean {
    return this.registrations.some(
      (registration) =>
        registration.eventId === eventId &&
        registration.email.toLowerCase() === email.toLowerCase(),
    );
  }

  add(eventId: string, dto: RegisterEventDto): EventRegistration {
    const registration: EventRegistration = {
      eventId,
      fullName: dto.fullName,
      email: dto.email,
      phone: dto.phone,
      createdAt: new Date().toISOString(),
    };

    this.registrations.push(registration);
    this.persist();

    return registration;
  }

  findByEvent(eventId: string): EventRegistration[] {
    return this.registrations.filter(
      (registration) => registration.eventId === eventId,
    );
  }
}
