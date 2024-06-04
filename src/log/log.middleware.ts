import { Inject, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class LogMiddleware implements NestMiddleware<Request, Response> {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private logger: Logger) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.debug(`Request for url : ${req.url}`);
    next();
  }
}
