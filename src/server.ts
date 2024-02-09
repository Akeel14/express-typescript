import dotenv from 'dotenv'
dotenv.config()

import app from './app'
import mongoose from 'mongoose'
import logger from './utils/logger'
import swaggerDocs from './utils/swagger/swagger'
import { connectDatabase } from './config/mongo'

connectDatabase()

const PORT: string | number = process.env.PORT ?? 8000

const server = app.listen(PORT, () => {
  logger.info(`Server is running at http://localhost:${PORT}`)
  swaggerDocs(app, PORT)
})

// Handle SIGINT
process.on('SIGINT', () => {
  logger.warn('SIGINT RECEIVED. Shutting down gracefully.')

  server.close(() => {
    logger.info('HTTP server closed.')

    // Close MongoDB connection
    mongoose.connection
      .close(false)
      .then(() => {
        logger.warn('MongoDB connection closed.')
        process.exit(0)
      })
      .catch((error) => {
        logger.error('Error closing MongoDB connection:', error)
        process.exit(1)
      })
  })
})
