import { Request, Response } from "express"
import { createdUserService, deletedUserService, listUsersService, sessionUserService, updatedUserService } from "../services/user.service"
import { instanceToPlain } from "class-transformer"

const createdUserController = async (req: Request, res: Response) => {
    const { email, name, isAdm, password } = req.body

    try {
        const newUser = await createdUserService({ email, name, isAdm, password })
        return res.status(201).json(instanceToPlain(newUser))
    } catch (err) {
        if (err instanceof Error) {
            return res.status(400).json({ message: err.message })
        }
    }
}

const sessionUserController = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const token = await sessionUserService({ email, password })
        return res.status(200).json(token)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(400).json( err.message)
        }
    }
}


const listUsersController = async (req: Request, res: Response) => {
    try {
        const users = await listUsersService()
        return res.status(200).json(instanceToPlain(users))
    } catch (err) {
        if (err instanceof Error) {
            return res.status(400).json({ message: err.message })
        }
    }
}

const updatedUserController = async (req: Request, res: Response) => {
    const user = req.body
    const id = req.params.id

    try {
        const userUpdated = await updatedUserService(user, id)
        return res.status(200).json(instanceToPlain(userUpdated))
    } catch (err) {
        if (err instanceof Error) {
            return res.status(401).json({ message: err.message })
        }
    }
}


const deletedUserController = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const resultDelete = await deletedUserService(id)
        if(resultDelete){
            return res.status(404).json(resultDelete)
        }

        return res.status(204).send()
    } catch (err) {
        if(err instanceof Error){
            return res.status(400).json({message: err.message})
        }
    }
}



export { createdUserController, sessionUserController, listUsersController, updatedUserController, deletedUserController }