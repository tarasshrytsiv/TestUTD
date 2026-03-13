"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const bullmq_2 = require("bullmq");
const registration_service_1 = require("../registration/registration.service");
const events_data_1 = require("./data/events.data");
let EventsService = class EventsService {
    registrationService;
    registrationQueue;
    constructor(registrationService, registrationQueue) {
        this.registrationService = registrationService;
        this.registrationQueue = registrationQueue;
    }
    findAll(query) {
        const requestedPage = query.page ?? 1;
        const limit = query.limit ?? 5;
        const search = query.search?.trim().toLowerCase();
        const dateFrom = query.dateFrom ? new Date(query.dateFrom) : undefined;
        const dateTo = query.dateTo ? new Date(query.dateTo) : undefined;
        const filtered = events_data_1.EVENTS_DATA.filter((event) => {
            const eventDate = new Date(event.date);
            if (search) {
                const haystack = `${event.title} ${event.location} ${event.shortDescription} ${event.description}`.toLowerCase();
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
    findOne(id) {
        const event = events_data_1.EVENTS_DATA.find((item) => item.id === id);
        if (!event) {
            throw new common_1.NotFoundException(`Event with id ${id} not found`);
        }
        return event;
    }
    async register(id, dto) {
        const event = this.findOne(id);
        if (this.registrationService.exists(event.id, dto.email)) {
            throw new common_1.ConflictException('This email is already registered for the selected event');
        }
        const registration = this.registrationService.add(event.id, dto);
        await this.registrationQueue.add('process-registration', {
            eventId: event.id,
            email: registration.email,
            fullName: registration.fullName,
            phone: registration.phone,
            createdAt: registration.createdAt,
        }, {
            attempts: 3,
            backoff: {
                type: 'exponential',
                delay: 1000,
            },
        });
        return {
            success: true,
            message: 'Registration successful',
        };
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, bullmq_1.InjectQueue)('registration')),
    __metadata("design:paramtypes", [registration_service_1.RegistrationService,
        bullmq_2.Queue])
], EventsService);
//# sourceMappingURL=events.service.js.map