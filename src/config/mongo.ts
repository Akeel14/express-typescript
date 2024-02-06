import mongoose from 'mongoose'
import dotenv from 'dotenv'
import logger from '../utils/logger'

dotenv.config()

export const connectDatabase = (): void => {
    const { DATABASE, DATABASE_PASSWORD } = process.env

    if (!DATABASE || !DATABASE_PASSWORD) {
        throw new Error('DATABASE environment variable(s) not set')
    }

    const dbConnectionURL = DATABASE.replace('<PASSWORD>', DATABASE_PASSWORD)

    mongoose.connect(dbConnectionURL)

    mongoose.connection
        .on('open', () => logger.info('Connected to MongoDB.'))
        .on('close', () => logger.warn('Disconnected from MongoDB.'))
        .on('error', (error) =>
            logger.error('MongoDB connection error:', error),
        )
}
