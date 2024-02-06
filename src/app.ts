import express from 'express'

import './controllers'
import { AppRouter } from './singletons/AppRouter'

const app = express()
app.use(AppRouter.getInstance())

export default app
