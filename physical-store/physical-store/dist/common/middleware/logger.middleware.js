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
exports.LoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
const winston = require("winston");
const fs = require("fs");
const path = require("path");
let LoggerMiddleware = class LoggerMiddleware {
    logger;
    constructor() {
        const logDir = path.resolve(__dirname, '../../../logs');
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
            transports: [
                new winston.transports.File({ filename: `${logDir}/app.log` }),
                new winston.transports.File({
                    filename: `${logDir}/error.log`,
                    level: 'error',
                }),
            ],
        });
    }
    use(req, res, next) {
        const { method, originalUrl } = req;
        const userAgent = req.get('user-agent') || '';
        const ip = req.ip;
        res.on('finish', () => {
            const { statusCode } = res;
            const contentLength = res.get('content-length');
            const logData = {
                timestamp: new Date().toISOString(),
                method,
                path: originalUrl,
                statusCode,
                contentLength,
                userAgent,
                ip,
            };
            const message = 'Requisição HTTP';
            if (statusCode >= 400) {
                this.logger.error(message, logData);
            }
            else {
                this.logger.info(message, logData);
            }
        });
        next();
    }
};
exports.LoggerMiddleware = LoggerMiddleware;
exports.LoggerMiddleware = LoggerMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LoggerMiddleware);
//# sourceMappingURL=logger.middleware.js.map