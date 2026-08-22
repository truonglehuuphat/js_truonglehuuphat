import {Router} from 'express'
import * as statusController from '../controller/statusController'

const statusRouter = Router();

statusRouter.get('/', statusController.getStats)

export default statusRouter;