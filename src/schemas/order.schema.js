import Joi from "joi";

export const orderSchema = Joi.object({
  clientId: Joi.number().required(),
  cakeId: Joi.number().required(),
  quantity: Joi.number().min(1).max(5).required(),
  totalPrice: Joi.number().required()
});
 