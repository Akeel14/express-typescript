import { Request, Response, NextFunction } from 'express'

import User from '../models/userModel'
import { restrictTo } from '../middleware/restrictedTo'
import { isAuthenticated } from '../middleware/isAuthenticated'
import { validateRequest } from '../middleware/validateRequest'
import { get, patch, del, controller, use } from '../decorators'
import { idSchema } from '../models/validation/todoValidationSchemas'
import { getAll, getOne, updateOne, deleteOne } from './handlerFactory'
import { updateUserSchema } from '../models/validation/userValidationSchemas'

@controller('/api/v1/users')
class UserController {
  @get('/')
  @use(isAuthenticated)
  async getUsers(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const handleGetAll = getAll(User)
    handleGetAll(req, res, next)
  }

  @get('/:id')
  @use(isAuthenticated)
  @use(validateRequest({ params: idSchema }))
  async getUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const handleGetUser = getOne(User)
    handleGetUser(req, res, next)
  }

  @patch('/:id')
  @use(isAuthenticated)
  @use(validateRequest({ body: updateUserSchema, params: idSchema }))
  async updateUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const handleUpdateUser = updateOne(User)
    handleUpdateUser(req, res, next)
  }

  @del('/:id')
  @use(isAuthenticated)
  @use(restrictTo('admin'))
  @use(validateRequest({ params: idSchema }))
  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const handleDeleteUser = deleteOne(User)
    handleDeleteUser(req, res, next)
  }
}
