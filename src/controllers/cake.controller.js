import { connection } from "../dataBase/db.js"

export async function cakePostController(req, res) {
  const {name, price, image, description} = req.body

  try {
    const checkIfExist = await connection.query(
      'SELECT * FROM cakes WHERE name=$1',
      [name]
      )
    if(checkIfExist){
      res.status(409).send("This name is already in use")
      return
    }

    await connection.query(
      'INSERT INTO cakes (name, price, image, description) VALUES ($1, $2, $3, $4)',
      [name, price, image, description]
    )

    res.sendStatus(201)
  } catch (err) {
    res.send(err).status(400)
  }
}


