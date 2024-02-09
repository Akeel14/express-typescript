import { Request, Response, NextFunction } from 'express'

import User from '../models/userModel'
import { isAuthenticated } from '../middleware/isAuthenticated'
import { get, patch, del, controller, use } from '../decorators'
import { getAll, getOne, updateOne, deleteOne } from './handlerFactory'

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
  async getUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const handleGetUser = getOne(User)
    handleGetUser(req, res, next)
  }

  @patch('/:id')
  async updateUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const handleUpdateUser = updateOne(User)
    handleUpdateUser(req, res, next)
  }

  @del('/:id')
  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const handleDeleteUser = deleteOne(User)
    handleDeleteUser(req, res, next)
  }
}
