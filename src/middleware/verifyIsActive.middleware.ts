import { NextFunction, Request, Response } from "express";

const verifyIsActiveMiddleware = (req: Request, res: Response, next:NextFunction) => {

    const isActive = req.user.isActive
    if(!isActive){
        return res.status(401).json({
            message: 'Error'
        })
    }

    next()
}

export default verifyIsActiveMiddleware