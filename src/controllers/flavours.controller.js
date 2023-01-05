import { connection } from "../dataBase/db.js"

export async function flavoursPostController(req, res) {
  const {name} = req.body

  try {
    const checkIfExist = await connection.query(
      'SELECT * FROM flavours WHERE name=$1',
      [name]
      )
    if(checkIfExist.rows[0]){
      res.status(409).send("This flavour already exists")
      return
    }

    await connection.query(
      'INSERT INTO flavours (name) VALUES ($1)',
      [name]
    )

    res.sendStatus(201)
  } catch (err) {
    res.send(err).status(400)
  }
}