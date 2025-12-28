import { Request, Response, NextFunction } from 'express';
import logger from '../lib/logger';
import { StatusCodes } from 'http-status-codes';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  logger.error(err.stack || err.message);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: 'Internal server error',
  });
};
