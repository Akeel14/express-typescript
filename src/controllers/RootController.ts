import { Request, Response } from 'express'
import { get, controller } from '../decorators'

@controller('/')
class RootController {
    @get('/')
    getRoot(req: Request, res: Response) {
        res.status(200).send('Welcome to Our Express Server!!')
    }
}
