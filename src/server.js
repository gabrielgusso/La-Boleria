import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { clientRoute } from "./routes/client.router.js"
import { cakeRoute } from "./routes/cake.router.js"
import { orderRoute } from "./routes/order.router.js"
import { flavoursRoute } from "./routes/flavours.router.js"
dotenv.config()


const app = express()
app.use(cors())
app.use(express.json())
app.use(clientRoute)
app.use(cakeRoute)
app.use(orderRoute)
app.use(flavoursRoute)


app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}.`)
})
