import passport from 'passport'
import { NextFunction, Request, Response } from 'express'

import User from '../models/userModel'
import { post, controller } from '../decorators'

@controller('/api/v1')
class AuthController {
  @post('/signup')
  async signup(req: Request, res: Response): Promise<void> {
    try {
      const newUser: IUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
      })

      console.log('New user:', newUser)

      newUser.password = undefined

      res.status(201).json({
        status: 'success',
        data: {
          user: newUser,
        },
      })
    } catch (error: any) {
      res.status(400).json({
        status: 'fail',
        message: error.message,
      })
    }
  }

  @post('/login')
  login(req: Request, res: Response, next: NextFunction): void {
    passport.authenticate(
      'local',
      (err: Error, user: IUser, info: { message?: string }) => {
        if (err) return next(err)
        if (!user) return res.status(400).json({ message: info.message })

        req.login(user, (err) => {
          if (err) return next(err)

          user.password = undefined

          return res.status(200).json({
            message: 'Successfully logged in',
            user,
          })
        })
      },
    )(req, res, next)
  }
}
