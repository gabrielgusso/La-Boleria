import { connection } from "../dataBase/db.js"

export async function orderPostController(req, res) {
  const { clientId, cakeId, quantity, totalPrice } = req.body

  try {
    await connection.query(
      'INSERT INTO orders ("clientId", "cakeId", quantity, "totalPrice") VALUES ($1, $2, $3, $4)',
      [clientId, cakeId, quantity, totalPrice]
    )

    res.sendStatus(200)
  } catch (err) {
    res.send(err).status(400)
  }
}

export async function orderGetController(req, res) {
  const date = req.query.date

  try {
    if (date) {
      const orderQueryRequests = await connection.query(
        `SELECT JSON_BUILD_OBJECT('id', c.id, 'name', c.name, 'address' , c.address, 'phone', c.phone) 
        AS client,
        JSON_BUILD_OBJECT('id', ca.id, 'name', ca.name, 'price' , ca.price, 'description', ca.description, 'image', ca.image, 'flavour', f.name) 
        AS cake,
        o.id as "orderId", o."createdAt", o.quantity, o."totalPrice" 
        FROM orders o
        JOIN clients c
        ON o."clientId" = c.id
        JOIN cakes ca
        ON o."cakeId" = ca.id
        JOIN flavours f
        ON ca."flavourId" = f.id
        WHERE DATE(o."createdAt") = $1`,
        [date]
      )
      if (!orderQueryRequests.rows[0]) {
        res.sendStatus(404)
        return
      }
      res.send(orderQueryRequests.rows)
      return
    }
    const orderRequests = await connection.query(
      `SELECT JSON_BUILD_OBJECT('id', c.id, 'name', c.name, 'address' , c.address, 'phone', c.phone) 
      AS client,
      JSON_BUILD_OBJECT('id', ca.id, 'name', ca.name, 'price' , ca.price, 'description', ca.description, 'image', ca.image, 'flavour', f.name) 
      AS cake,
      o.id as "orderId", o."createdAt", o.quantity, o."totalPrice" 
      FROM orders o
      JOIN clients c
      ON o."clientId" = c.id
      JOIN cakes ca
      ON o."cakeId" = ca.id
      JOIN flavours f
      ON ca."flavourId" = f.id`
    )
    if (!orderRequests.rows[0]) {
      res.sendStatus(404)
      return
    }

    res.send(orderRequests.rows).status(200)
  } catch (err) {
    res.send(err).status(400)
  }
}

export async function orderGetByIdController(req, res) {
  const id = req.params.id

  try {
    const orderByIdRequests = await connection.query(
      `SELECT JSON_BUILD_OBJECT('id', c.id, 'name', c.name, 'address' , c.address, 'phone', c.phone) 
        AS client,
        JSON_BUILD_OBJECT('id', ca.id, 'name', ca.name, 'price' , ca.price, 'description', ca.description, 'image', ca.image) 
        AS cake,
        o.id as "orderId", TO_CHAR(o."createdAt", 'yyyy-mm-dd HH24:MI') as "createdAt", o.quantity, o."totalPrice" 
        FROM orders o
        JOIN clients c
        ON o."clientId" = c.id
        JOIN cakes ca
        ON o."cakeId" = ca.id
        WHERE o.id = $1`,
      [id]
    )
    if (!orderByIdRequests.rows[0]) {
      res.sendStatus(404)
      return
    }

    res.send(orderByIdRequests.rows[0]).status(200)
  } catch (err) {
    res.send(err).status(400)
  }
}

export async function orderPacthController(req, res) {
  const id = req.params.id
  const isNum = /^\d+$/.test(id)
  if (!isNum) {
    res.sendStatus(400)
    return
  }
  try {
    const checkIfExist = await connection.query(
      "SELECT * FROM orders WHERE id=$1",
      [id]
    )
    if (!checkIfExist.rows[0]) {
      res.sendStatus(404)
      return
    }

    await connection.query(
      `UPDATE orders SET "isDelivered" = true WHERE id = $1;`,
      [id]
    )

    res.sendStatus(204)
  } catch (err) {
    res.send(err).status(400)
  }
}
