import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import 'dotenv/config'


const verifyTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {

    let token = req.headers.authorization

    if (!token) {
        return res.status(401).json({
            message: 'Authorization is missing'
        })
    }


    token = token.split(' ')[1]
    jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded: any) => {
        if (error) {
            return res.status(401).json(
                {
                    message: 'Invalid token'
                })
        }
        req.user = {
            isAdm: decoded.isAdm,
            isActive: decoded.isActive,
            id: decoded.sub
        }
        return next()
    })
}

export default verifyTokenMiddleware