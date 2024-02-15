import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

interface ValidationOptions {
  body?: Joi.ObjectSchema
  params?: Joi.ObjectSchema
}

export const validateRequest =
  (options: ValidationOptions) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (options.body) {
      const { error } = options.body.validate(req.body)
      if (error) {
        return res
          .status(400)
          .json({ status: 'fail', message: error.details[0].message })
      }
    }

    if (options.params) {
      const { error } = options.params.validate(req.params)
      if (error) {
        return res
          .status(400)
          .json({ status: 'fail', message: error.details[0].message })
      }
    }

    next()
  }
