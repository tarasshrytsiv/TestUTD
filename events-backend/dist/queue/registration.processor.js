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
exports.RegistrationProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
let RegistrationProcessor = class RegistrationProcessor extends bullmq_1.WorkerHost {
    process(job) {
        console.log('Processing registration:', job.data);
        return Promise.resolve();
    }
    onFailed(job, error) {
        console.error('Registration job failed:', {
            jobId: job?.id,
            attemptsMade: job?.attemptsMade,
            error: error.message,
        });
    }
};
exports.RegistrationProcessor = RegistrationProcessor;
__decorate([
    (0, bullmq_1.OnWorkerEvent)('failed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Error]),
    __metadata("design:returntype", void 0)
], RegistrationProcessor.prototype, "onFailed", null);
exports.RegistrationProcessor = RegistrationProcessor = __decorate([
    (0, bullmq_1.Processor)('registration')
], RegistrationProcessor);
//# sourceMappingURL=registration.processor.js.map