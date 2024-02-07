import { type Request, type Response, type NextFunction } from 'express'

export type ExpressFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
  val?: string,
) => void | Response | Promise<Response | void>
