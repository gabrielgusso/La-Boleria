import { clientSchema } from "../schemas/client.schema.js"

export async function clientMiddleware(req, res, next) {
  const auth = req.body

  const validation = clientSchema.validate(auth, { abortEarly: false })
  if (validation.error) {
    const error = validation.error.details.map((detail) => detail.message)
    res.status(400).send(error)
    return
  }

  next()
}

