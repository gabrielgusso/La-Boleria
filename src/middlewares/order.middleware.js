import { orderSchema } from "../schemas/order.schema.js"
import { connection } from "../dataBase/db.js"

export async function orderMiddleware(req, res, next) {
  const order = req.body

  const validation = orderSchema.validate(order, { abortEarly: false })
  if (validation.error) {
    const error = validation.error.details.map((detail) => detail.message)
    res.status(400).send(error)
    return
  }

  try {

    const checkIfClientIdExist = await connection.query(
      'SELECT * FROM clients WHERE id=$1',
      [order.clientId]
      )

      const checkIfCakeIdExist = await connection.query(
        'SELECT * FROM cakes WHERE id=$1',
        [order.cakeId]
        )
        
    if(!checkIfClientIdExist.rows[0] || !checkIfCakeIdExist.rows[0]){
      res.sendStatus(404)
      return
    }

  } catch (err) {
    res.send(err).status(500)
    return
  }

  next()
}

