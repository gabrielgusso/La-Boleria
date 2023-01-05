import { connection } from "../dataBase/db.js"

export async function clientController(req, res) {
  const { name, address, phone } = req.body

  try {
    await connection.query(
      "INSERT INTO clients (name, address, phone) VALUES ($1, $2, $3)",
      [name, address, phone]
    )

    res.sendStatus(200)
  } catch (err) {
    res.send(err).status(400)
  }
}

export async function clientGetController(req, res) {
  const id = req.params.id

  try {
    const orderByIdRequests = await connection.query(
      `SELECT o.id as "orderId", o.quantity, TO_CHAR(o."createdAt", 'yyyy-mm-dd HH24:MI') as "createdAt", o."totalPrice", ca.name as "cakeName"
      FROM orders o
      JOIN clients c
      ON o."clientId" = c.id
      JOIN cakes ca
      ON o."cakeId" = ca.id
      WHERE c.id = $1`,
      [id]
    )
    if (!orderByIdRequests.rows[0]) {
      res.sendStatus(404)
      return
    }

    res.send(orderByIdRequests.rows).status(200)
  } catch (err) {
    res.send(err).status(400)
  }
}
