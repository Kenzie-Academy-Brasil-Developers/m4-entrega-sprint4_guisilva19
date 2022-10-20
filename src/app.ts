import "reflect-metadata"
import "express-async-errors"
import express from "express"
import userRoutes from "./routes/user/userRoutes"
import handleErrorsMiddleware from "./middleware/handleErrors.middleware"


const app = express()
app.use(express.json())
app.use(userRoutes)
app.use(handleErrorsMiddleware)

export default app