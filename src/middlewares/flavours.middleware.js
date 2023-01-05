import { flavoursSchema } from "../schemas/flavours.schema.js"

export async function flavoursMiddleware(req, res, next) {
  const auth = req.body

  const validation = flavoursSchema.validate(auth, { abortEarly: false })
  if (validation.error) {
    const error = validation.error.details.map((detail) => detail.message)
    res.status(400).send(error)
    return
  }

  next()
}

