import mongoose from 'mongoose'
import { Request, Response, NextFunction } from 'express'

import AppError from '../utils/AppError'
import { catchAsync } from '../utils/catchAsync'
import { APIFeatures, QueryString } from '../utils/APIFeatures'

export const getAll = (Model: mongoose.Model<any>) =>
  catchAsync(async (req: Request, res: Response) => {
    const features = new APIFeatures(Model.find(), req.query as QueryString)
      .filter()
      .sort()
      .limitFields()
      .paginate()
    const doc = await features.query

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: doc,
    })
  })

export const createOne = (Model: mongoose.Model<any>) =>
  catchAsync(async (req: Request, res: Response) => {
    const doc = await Model.create(req.body)

    res.status(201).json({
      status: 'success',
      data: doc,
    })
  })

export const getOne = (Model: mongoose.Model<any>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findById(req.params.id)
    if (!doc) {
      return next(new AppError('No document found with that ID', 404))
    }

    res.status(200).json({
      status: 'success',
      data: doc,
    })
  })

export const updateOne = (Model: mongoose.Model<any>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!doc) {
      return next(new AppError('No document found with that ID', 404))
    }

    res.status(200).json({
      status: 'success',
      data: doc,
    })
  })

export const deleteOne = (Model: mongoose.Model<any>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndDelete(req.params.id)

    if (!doc) {
      return next(new AppError('No document found with that ID', 404))
    }

    res.status(204).json({
      status: 'success',
      data: null,
    })
  })
