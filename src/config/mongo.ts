import mongoose from 'mongoose'
import dotenv from 'dotenv'
import logger from '../utils/logger'

dotenv.config()

export const dbConnectionURL = (): string => {
  const { DATABASE, DATABASE_PASSWORD } = process.env

  if (DATABASE === undefined || DATABASE_PASSWORD === undefined) {
    throw new Error('DATABASE environment variable(s) not set')
  }

  return DATABASE.replace('<PASSWORD>', DATABASE_PASSWORD)
}

export const connectDatabase = (): void => {
  void mongoose.connect(dbConnectionURL())

  mongoose.connection
    .on('open', () => logger.info('Connected to MongoDB.'))
    .on('close', () => logger.warn('Disconnected from MongoDB.'))
    .on('error', (error) => logger.error('MongoDB connection error:', error))
}
