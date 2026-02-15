import type{ Request, Response, NextFunction } from 'express';
import { ApiError } from './ApiError.js';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err); 

 
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // For Mongoose validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: Object.values(err.errors).map((e: any) => e.message).join(', '),
    });
  }

  
  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
};
