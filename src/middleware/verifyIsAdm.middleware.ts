import { Request, Response, NextFunction } from "express";
import 'dotenv/config'


const verifyIsAdmMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const isAdm = req.user.isAdm

    if (!isAdm) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    next()

}

export default verifyIsAdmMiddleware