import { Router } from "express"
import { cakeMiddleware } from "../middlewares/cake.middleware.js"
import { cakePostController } from "../controllers/cake.controller.js"

export const cakeRoute = Router()

cakeRoute.post("/cakes", cakeMiddleware, cakePostController)

