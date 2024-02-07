import express from 'express'
import cors, { CorsOptions } from 'cors'
import './controllers'
import { AppRouter } from './singletons/AppRouter'
import { ErrorController } from './controllers/ErrorController'
import AppError from './utils/AppError'

const app = express()
app.use(AppRouter.getInstance())

// Whitelist of allowed origins
const whitelist: string[] = [
  'http://example.com',
  'http://localhost:3000',
  'https://yourdomain.com',
]

// CORS options with type checking
const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true) // Allowed origin
    } else {
      callback(new Error('Not allowed by CORS')) // Not allowed origin
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT', 'OPTIONS'], // Allowed methods
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Origin',
    'x-access-token',
    'XSRF-TOKEN',
  ], // Allowed headers
  credentials: true, // This allows session cookies from the browser to pass through
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Use CORS with the above options
app.use(cors(corsOptions))

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

// Error handling middleware
app.use(ErrorController.errorHandler)

export default app
