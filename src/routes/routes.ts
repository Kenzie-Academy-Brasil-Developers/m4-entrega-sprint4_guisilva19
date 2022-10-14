import { Router } from 'express'
import  {createdUserController, sessionUserController}  from '../controllers/user.controller'

const routes = Router()

routes.post('/users', createdUserController)
routes.post('/login/users', sessionUserController)



export default routes