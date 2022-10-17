import { Router } from 'express'
import  {createdUserController, deletedUserController, listUsersController, sessionUserController, updatedUserController}  from '../controllers/user.controller'
import verifyIsActiveMiddleware from '../middleware/verifyIsActive.middleware'
import verifyIsAdmMiddleware from '../middleware/verifyIsAdm.middleware'
import verifyTokenMiddleware from '../middleware/verifyToken.middleware'

const routes = Router()

routes.post('/users', createdUserController)
routes.post('/login/users', sessionUserController)

routes.get('/users', verifyTokenMiddleware, verifyIsAdmMiddleware, listUsersController)

routes.patch('/users/:id', verifyTokenMiddleware, verifyIsAdmMiddleware, updatedUserController)

routes.delete('/users/:id', verifyTokenMiddleware, verifyIsAdmMiddleware, deletedUserController)

export default routes