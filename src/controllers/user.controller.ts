import { Request, Response } from "express"
import {createdUserService, sessionUserService} from "../services/user.service"



const createdUserController = async (req: Request, res:Response) => {
    const { email, name, isAdm, password} = req.body

    try {
        const newUser = await createdUserService({email, name, isAdm, password})
        return res.status(201).json(newUser)
    } catch (err) {
        if(err instanceof Error){
            return res.status(400).json({message: err.message})
        }
    }
}

const sessionUserController = async (req: Request, res: Response ) => {
    const { email, password } = req.body
    try {
        const token = await sessionUserService({email, password })
        return res.status(200).json({token})
    } catch (err) {
        if(err instanceof Error){
            return res.status(400).json({message: err.message})
        }
    }
}

export { createdUserController, sessionUserController }