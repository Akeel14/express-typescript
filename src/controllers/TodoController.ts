import { Request, Response, NextFunction } from 'express'

import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from './handlerFactory'
import Todo from '../models/todoModel'
import { get, post, patch, del, controller, use } from '../decorators'
import { isAuthenticated } from '../middleware/isAuthenticated'
@controller('/api/v1/todos')
class TodoController {
  @get('/')
  @use(isAuthenticated)
  async getTodos(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const handleGetAll = getAll(Todo)
    handleGetAll(req, res, next)
  }

  @post('/')
  @use(isAuthenticated)
  async addTodo(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const handleCreateOne = createOne(Todo)
    handleCreateOne(req, res, next)
  }

  @get('/:id')
  @use(isAuthenticated)
  async getTodo(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const handleGetOne = getOne(Todo)
    handleGetOne(req, res, next)
  }

  @patch('/:id')
  @use(isAuthenticated)
  async updateTodo(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const handleUpdateOne = updateOne(Todo)
    handleUpdateOne(req, res, next)
  }

  @del('/:id')
  @use(isAuthenticated)
  async deleteTodo(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const handleDeleteOne = deleteOne(Todo)
    handleDeleteOne(req, res, next)
  }
}
