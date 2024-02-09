import { Request, Response, NextFunction } from 'express'

import Todo from '../models/todoModel'
import { get, post, patch, del, controller } from '../decorators'
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from './handlerFactory'
@controller('/api/v1/todos')
class TodoController {
  @get('/')
  async getTodos(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const handleGetAll = getAll(Todo)
    handleGetAll(req, res, next)
  }

  @post('/')
  async addTodo(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const handleCreateOne = createOne(Todo)
    handleCreateOne(req, res, next)
  }

  @get('/:id')
  async getTodo(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const handleGetOne = getOne(Todo)
    handleGetOne(req, res, next)
  }

  @patch('/:id')
  async updateTodo(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const handleUpdateOne = updateOne(Todo)
    handleUpdateOne(req, res, next)
  }

  @del('/:id')
  async deleteTodo(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const handleDeleteOne = deleteOne(Todo)
    handleDeleteOne(req, res, next)
  }
}
