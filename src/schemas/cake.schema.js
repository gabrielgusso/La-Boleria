import Joi from "joi"

export const cakeSchema = Joi.object({
  name: Joi.string().min(2).required(),
  price: Joi.number().greater(0).required(),
  image: Joi.string().allow(""),
  description: Joi.string().allow(""),
})

export const imageSchema = Joi.object({
  image: Joi.string().uri().required(),
})
