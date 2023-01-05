import { Router } from "express"
import { orderPostController, orderGetController, orderGetByIdController } from "../controllers/order.controller.js"
import { orderMiddleware } from "../middlewares/order.middleware.js"
export const orderRoute = Router()

orderRoute.post("/order", orderMiddleware, orderPostController)

orderRoute.get("/orders", orderGetController)

orderRoute.get("/orders/:id", orderGetByIdController)
