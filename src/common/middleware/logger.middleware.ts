import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as winston from 'winston';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger: winston.Logger;

  constructor() {
    const logDir = path.resolve(__dirname, '../../../logs');

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }

    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        // Todas as requisições
        new winston.transports.File({ filename: `${logDir}/app.log` }),

        // Somente erros
        new winston.transports.File({
          filename: `${logDir}/error.log`,
          level: 'error',
        }),
      ],
    });
  }

  use(req: Request, res: Response, next: NextFunction): void {
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

      // Envia para logger como info ou error
      if (statusCode >= 400) {
        this.logger.error(message, logData);
      } else {
        this.logger.info(message, logData);
      }
    });

    next();
  }
}
