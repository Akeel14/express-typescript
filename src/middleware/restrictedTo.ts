import { Request, Response, NextFunction } from 'express'

export const restrictTo = (...roles: Array<'admin' | 'user'>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // roles ['admin', 'user']. role='user'

    //   @ts-ignore
    if (req.user && !roles.includes(req.user.role)) {
      console.log('Current user in restrictTo Function', req.user)

      return res.status(401).json({
        status: 'fail',
        message: 'You do not have permission to perform this action',
      })
    }

    next()
  }
}
