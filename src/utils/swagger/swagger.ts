import swaggerUi from 'swagger-ui-express'
import { type Express, type Request, type Response } from 'express'

import log from '../logger'
import * as swaggerDocument from './api-docs.json'

function swaggerDocs(app: Express, port: string | number): void {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerDocument)
  })

  log.info(`Docs available at http://localhost:${port}/docs`)
}

export default swaggerDocs
