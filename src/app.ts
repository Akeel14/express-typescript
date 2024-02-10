import passport from 'passport'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cors, { CorsOptions } from 'cors'
import express, { json, urlencoded } from 'express'

import './controllers'
import './config/strategies'
import AppError from './utils/AppError'
import { ErrorController } from './controllers'
import { dbConnectionURL } from './config/mongo'
import swaggerDocs from './utils/swagger/swagger'
import { AppRouter } from './singletons/AppRouter'
import authRoutes from './config/strategies/authRoutes'

const app = express()
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(passport.initialize())
app.use(
  session({
    //@ts-ignore
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000 * 24, // 1 hour * 24 = 24 hours
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    },
    store: MongoStore.create({
      mongoUrl: dbConnectionURL(),
      collectionName: 'sessions',
    }),
  }),
)
app.use(passport.session())

// Use the auth routes
app.use('/api/v1', authRoutes)

const whitelist: string[] = [
  'http://localhost:8000',
  'http://localhost:5173',
  'https://todoapplicationtypescript.netlify.app',
]

const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

app.use(AppRouter.getInstance())
swaggerDocs(app, process.env.PORT ?? 8000)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(ErrorController.errorHandler)

export default app
