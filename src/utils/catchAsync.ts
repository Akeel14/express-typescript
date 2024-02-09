import { Request, Response, NextFunction } from 'express'
import { ExpressFunction } from '../types/expressFunction'

export const catchAsync = (fn: ExpressFunction) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}
