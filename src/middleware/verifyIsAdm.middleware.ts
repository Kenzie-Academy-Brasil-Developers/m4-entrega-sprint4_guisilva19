import { Request, Response, NextFunction } from "express";
import 'dotenv/config'


const verifyIsAdmMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const isAdm = req.user.isAdm
    const idRoute = req.params.id
    const idToken = req.user.id


    if (isAdm) {
        return next()
    }

    if (idToken === idRoute) {
        return next()
    }

    return res.status(401).json({
        message: "It's not admin"
    })
}

export default verifyIsAdmMiddleware