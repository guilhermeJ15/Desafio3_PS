import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export declare class LoggerMiddleware implements NestMiddleware {
    private logger;
    constructor();
    use(req: Request, res: Response, next: NextFunction): void;
}
