import { Request, Response } from 'express'

import Todo from '../models/todoModel'
import { get, post, patch, del, controller } from '../decorators'
import APIFeatures, { type QueryString } from '../utils/ApiFeatures'
@controller('/api/v1/todos')
class TodoController {
  @get('/')
  async getTodos(req: Request, res: Response): Promise<void> {
    try {
      const features = new APIFeatures(Todo.find(), req.query as QueryString)
        .filter()
        .sort()
        .limitFields()
        .paginate()

      const todos = await features.query

      res.status(200).json({
        status: 'success',
        results: todos.length,
        data: {
          todos,
        },
      })
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err,
      })
    }
  }

  @post('/')
  async addTodo(req: Request, res: Response): Promise<void> {
    try {
      const newTodo = await Todo.create(req.body)

      res.status(200).json({
        status: 'success',
        data: {
          todo: newTodo,
        },
      })
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err,
      })
    }
  }

  @get('/:id')
  async getTodo(req: Request, res: Response): Promise<void> {
    try {
      const todo = await Todo.findById(req.params.id)

      res.status(200).json({
        status: 'success',
        data: {
          todo,
        },
      })
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err,
      })
    }
  }

  @patch('/:id')
  async updateTodo(req: Request, res: Response): Promise<void> {
    try {
      const updateData = req.body

      const todo = await Todo.findByIdAndUpdate(req.params.id, updateData, {
        new: true,
        runValidators: true,
      })

      res.status(200).json({
        status: 'success',
        data: {
          todo,
        },
      })
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err,
      })
    }
  }

  @del('/:id')
  async deleteTodo(req: Request, res: Response): Promise<void> {
    try {
      await Todo.findByIdAndDelete(req.params.id)

      res.status(204).json({
        status: 'success',
        data: null,
      })
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err,
      })
    }
  }
}
