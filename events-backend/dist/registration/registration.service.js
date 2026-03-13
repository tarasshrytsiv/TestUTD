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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
let RegistrationService = class RegistrationService {
    storageDir = (0, path_1.join)(process.cwd(), 'data');
    storageFile = (0, path_1.join)(this.storageDir, 'registrations.json');
    registrations = [];
    constructor() {
        this.ensureStorage();
        this.loadFromJson();
    }
    ensureStorage() {
        if (!(0, fs_1.existsSync)(this.storageDir)) {
            (0, fs_1.mkdirSync)(this.storageDir, { recursive: true });
        }
        if (!(0, fs_1.existsSync)(this.storageFile)) {
            (0, fs_1.writeFileSync)(this.storageFile, '[]', 'utf-8');
        }
    }
    loadFromJson() {
        try {
            const raw = (0, fs_1.readFileSync)(this.storageFile, 'utf-8');
            const parsed = JSON.parse(raw);
            this.registrations.push(...parsed);
        }
        catch {
            this.registrations.length = 0;
            (0, fs_1.writeFileSync)(this.storageFile, '[]', 'utf-8');
        }
    }
    persist() {
        (0, fs_1.writeFileSync)(this.storageFile, JSON.stringify(this.registrations, null, 2), 'utf-8');
    }
    exists(eventId, email) {
        return this.registrations.some((registration) => registration.eventId === eventId &&
            registration.email.toLowerCase() === email.toLowerCase());
    }
    add(eventId, dto) {
        const registration = {
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
    findByEvent(eventId) {
        return this.registrations.filter((registration) => registration.eventId === eventId);
    }
};
exports.RegistrationService = RegistrationService;
exports.RegistrationService = RegistrationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RegistrationService);
//# sourceMappingURL=registration.service.js.map