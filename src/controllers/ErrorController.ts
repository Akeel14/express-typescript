// src/controllers/ErrorController.ts
import { Request, Response, NextFunction } from 'express'

import logger from '../utils/logger'
import AppError from '../utils/AppError'

export class ErrorController {
  static handleCastErrorDB(err: any): AppError {
    const message = `Invalid ${err.path}: ${err.value}.`
    return new AppError(message, 400)
  }

  static handleDuplicateFieldsDB(err: any): AppError {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]
    const message = `Duplicate field value: ${value}. Please use another value!`
    return new AppError(message, 400)
  }

  static handleValidationErrorDB(err: any): AppError {
    const errors = Object.values(err.errors).map((el: any) => el.message)
    const message = `Invalid input data. ${errors.join('. ')}`
    return new AppError(message, 400)
  }

  static handleJWTError(): AppError {
    return new AppError('Invalid token. Please log in again!', 401)
  }

  static handleJWTExpiredError(): AppError {
    return new AppError('Your token has expired! Please log in again.', 401)
  }

  // Error handling method for development environment
  static sendErrorDev(err: AppError, req: Request, res: Response): void {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    })
  }

  // Error handling method for production environment
  static sendErrorProd(err: AppError, req: Request, res: Response): void {
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      })
    } else {
      // Log the error for internal tracking
      logger.error(
        JSON.stringify({
          level: 'error',
          message: 'Something went very wrong!',
          error: err,
          timestamp: new Date().toISOString(),
        }),
      )

      // Send a generic message to the client
      res.status(500).json({
        status: 'error',
        message: 'Something went very wrong!',
      })
    }
  }

  // Main error handler
  static errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    if (process.env.NODE_ENV === 'development') {
      ErrorController.sendErrorDev(err, req, res)
    } else if (process.env.NODE_ENV === 'production') {
      let error = { ...err, message: err.message }

      if (error.name === 'CastError')
        error = ErrorController.handleCastErrorDB(error)
      if (error.code === 11000)
        error = ErrorController.handleDuplicateFieldsDB(error)
      if (error.name === 'ValidationError')
        error = ErrorController.handleValidationErrorDB(error)
      if (error.name === 'JsonWebTokenError')
        error = ErrorController.handleJWTError()
      if (error.name === 'TokenExpiredError')
        error = ErrorController.handleJWTExpiredError()

      ErrorController.sendErrorProd(error, req, res)
    }
  }
}
