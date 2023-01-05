import { Router } from "express"
import { clientController, clientGetController } from "../controllers/client.controller.js"
import { clientMiddleware } from "../middlewares/client.middleware.js"
export const clientRoute = Router()

clientRoute.post("/clients", clientMiddleware, clientController)

clientRoute.get("/clients/:id/orders", clientGetController)
