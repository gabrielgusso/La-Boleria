import { connection } from "../dataBase/db.js"

export async function orderPostController(req, res) {
  const { clientId, cakeId, quantity, totalPrice } = req.body
  
  try {
    await connection.query('INSERT INTO orders ("clientId", "cakeId", quantity, "totalPrice") VALUES ($1, $2, $3, $4)', [
      clientId, cakeId, quantity, totalPrice
    ])

    res.sendStatus(200)
  } catch (err) {
    res.send(err).status(400)
  }
}

export async function orderGetController(req, res) {
  const date = req.query.date

  try {
    if(date){
      const cakeQueryRequests = await connection.query(
        `SELECT JSON_BUILD_OBJECT('id', c.id, 'name', c.name, 'address' , c.address, 'phone', c.phone) 
        AS client,
        JSON_BUILD_OBJECT('id', ca.id, 'name', ca.name, 'price' , ca.price, 'description', ca.description, 'image', ca.image) 
        AS cake,
        o.id as "orderId", o."createdAt", o.quantity, o."totalPrice" 
        FROM orders o
        JOIN clients c
        ON o."clientId" = c.id
        JOIN cakes ca
        ON o."cakeId" = ca.id
        WHERE DATE(o."createdAt") = $1`,
        [date]
        )
        if(!cakeQueryRequests.rows[0]){
          res.sendStatus(404)
          return
        }
        res.send(cakeQueryRequests.rows)
        return
    }
    const cakeRequests = await connection.query(
      `SELECT JSON_BUILD_OBJECT('id', c.id, 'name', c.name, 'address' , c.address, 'phone', c.phone) 
      AS client,
      JSON_BUILD_OBJECT('id', ca.id, 'name', ca.name, 'price' , ca.price, 'description', ca.description, 'image', ca.image) 
      AS cake,
      o.id as "orderId", o."createdAt", o.quantity, o."totalPrice" 
      FROM orders o
      JOIN clients c
      ON o."clientId" = c.id
      JOIN cakes ca
      ON o."cakeId" = ca.id`,
      )
      if(!cakeRequests.rows[0]){
        res.sendStatus(404)
        return
      }

    res.send(cakeRequests.rows).status(200)
  } catch (err) {
    res.send(err).status(400)
  }
}
