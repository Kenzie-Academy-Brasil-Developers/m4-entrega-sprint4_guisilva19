import { Request, Response, NextFunction } from "express";
import 'dotenv/config'


const verifyUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const isAdm = req.user.isAdm
    const idRoute = req.params.id
    const idToken = req.user.id

    if (idToken === idRoute || isAdm) {
        return next()
    }

    if (idToken !== idRoute && !isAdm) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    return res.status(403).json({
        message: "Unauthorized"
    })

}

export default verifyUserMiddleware