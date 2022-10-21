import { Request, Response } from "express"
import { createdUserService, deletedUserService, listUsersService, sessionUserService, updatedUserService } from "../services/user.service"
import { instanceToPlain } from "class-transformer"

const createdUserController = async (req: Request, res: Response) => {
    const { email, name, isAdm, password } = req.body
    const newUser = await createdUserService({ email, name, isAdm, password })
    return res.status(201).json(instanceToPlain(newUser))
}

const sessionUserController = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const token = await sessionUserService({ email, password })
    return res.status(200).json({ token })
}


const listUsersController = async (req: Request, res: Response) => {

    const users = await listUsersService()
    return res.status(200).json(instanceToPlain(users))

}

const updatedUserController = async (req: Request, res: Response) => {
    const { name, email, password } = req.validateUser
    const id = req.params.id
    await updatedUserService({ name, email, password}, id)
    return res.status(200).json({ message: 'User updated' })

}


const deletedUserController = async (req: Request, res: Response) => {
    const id = req.params.id
    await deletedUserService(id)
    return res.status(204).json({ message: 'User deleted' })
}



export { createdUserController, sessionUserController, listUsersController, updatedUserController, deletedUserController }