import { Request, Response, NextFunction } from 'express'

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(req.isAuthenticated())
  if (req.isAuthenticated()) {
    return next()
  }

  res.status(401).json({
    status: 'fail',
    message: 'You are not logged in! Please log in to get access.',
  })
}
