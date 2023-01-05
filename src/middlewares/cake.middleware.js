import { cakeSchema, imageSchema } from "../schemas/cake.schema.js"

export async function cakeMiddleware(req, res, next) {
  const cake = req.body
  const {image} = cake
  const imageValidation = {
    image
  }

  const validation = cakeSchema.validate(cake, { abortEarly: false })
  if (validation.error) {
    const error = validation.error.details.map((detail) => detail.message)
    res.status(400).send(error)
    return
  }

  const validationImage = imageSchema.validate(imageValidation, { abortEarly: false })
  if (validationImage.error) {
    const error = validationImage.error.details.map((detail) => detail.message)
    res.status(422).send(error)
    return
  }

  next()
}
