import { Router } from "express"
import { clientController } from "../controllers/client.controller.js"
import { clientMiddleware } from "../middlewares/client.middleware.js"
export const clientRoute = Router()

clientRoute.post("/clients", clientMiddleware, clientController)
