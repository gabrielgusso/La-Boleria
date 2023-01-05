import { connection } from "../dataBase/db.js"

export async function clientController(req, res) {
  const { name, address, phone } = req.body
  
  try {
    
    await connection.query("INSERT INTO clients (name, address, phone) VALUES ($1, $2, $3)", [
      name, address, phone
    ])

    res.sendStatus(200)
  } catch (err) {
    res.send(err).status(400)
  }
}
