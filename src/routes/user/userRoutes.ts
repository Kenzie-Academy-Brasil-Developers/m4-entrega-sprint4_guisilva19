import { Router } from 'express'
import  {createdUserController, deletedUserController, listUsersController, sessionUserController, updatedUserController}  from '../../controllers/user.controller'
import verifyIsAdmMiddleware from '../../middleware/verifyIsAdm.middleware'
import verifyTokenMiddleware from '../../middleware/verifyToken.middleware'
import validateUserUpdateMiddleware from '../../middleware/verifyUpdate.middleware'
import verifyUserMiddleware from '../../middleware/verifyUser.middleware'

const userRoutes = Router()

userRoutes.post('/users', createdUserController)
userRoutes.post('/login', sessionUserController)

userRoutes.get('/users', verifyTokenMiddleware, verifyIsAdmMiddleware, listUsersController)

userRoutes.patch('/users/:id', verifyTokenMiddleware, verifyUserMiddleware, validateUserUpdateMiddleware, updatedUserController)

userRoutes.delete('/users/:id', verifyTokenMiddleware, verifyIsAdmMiddleware,  deletedUserController)

export default userRoutes