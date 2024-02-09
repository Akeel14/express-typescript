import { Request, Response } from 'express'

import { get, post, patch, del, controller, use } from '../decorators'
import APIFeatures, { type QueryString } from '../utils/ApiFeatures'
import User from '../models/userModel'
import { isAuthenticated } from '../middleware/isAuthenticated'

@controller('/api/v1/users')
class UserController {
  @get('/')
  @use(isAuthenticated)
  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const features = new APIFeatures(User.find(), req.query as QueryString)
        .filter()
        .sort()
        .limitFields()
        .paginate()

      const users = await features.query

      res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
          users,
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
  async addUser(req: Request, res: Response): Promise<void> {
    try {
      const newUser = await User.create(req.body)

      res.status(200).json({
        status: 'success',
        data: {
          todo: newUser,
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
  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findById(req.params.id)

      res.status(200).json({
        status: 'success',
        data: {
          user,
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
  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const updateData = req.body

      const user = await User.findByIdAndUpdate(req.params.id, updateData, {
        new: true,
        runValidators: true,
      })

      res.status(200).json({
        status: 'success',
        data: {
          user,
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
  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      await User.findByIdAndDelete(req.params.id)

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
