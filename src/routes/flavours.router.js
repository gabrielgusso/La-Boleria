import { Router } from "express"
import { flavoursMiddleware } from "../middlewares/flavours.middleware.js"
import { flavoursPostController } from "../controllers/flavours.controller.js"

export const flavoursRoute = Router()

flavoursRoute.post("/flavours", flavoursMiddleware, flavoursPostController)

