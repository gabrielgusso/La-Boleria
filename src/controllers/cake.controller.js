import { connection } from "../dataBase/db.js"

export async function cakePostController(req, res) {
  const {name, price, image, description, flavourId} = req.body
  
  try {
    const checkIfExist = await connection.query(
      'SELECT * FROM cakes WHERE name=$1',
      [name]
      )
    if(checkIfExist.rows[0]){
      res.status(409).send("This name is already in use")
      return
    }

    const checkIfFlavorExist = await connection.query(
      'SELECT * FROM flavours WHERE id=$1',
      [flavourId]
      )
    if(!checkIfFlavorExist.rows[0]){
      res.sendStatus(404)
      return
    }

    await connection.query(
      'INSERT INTO cakes (name, price, image, description, "flavourId") VALUES ($1, $2, $3, $4, $5)',
      [name, price, image, description, flavourId]
    )

    res.sendStatus(201)
  } catch (err) {
    res.send(err).status(400)
  }
}


