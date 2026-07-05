import Joi from "joi";

const objectId = Joi.string()
  .hex()
  .length(24)
  .required()
  .messages({
    "string.base": "Invalid id",
    "string.hex": "Invalid MongoDB ObjectId",
    "string.length": "Invalid MongoDB ObjectId",
    "any.required": "Id is required",
  });

const addToCartSchema = {
  body: Joi.object({
    productId: objectId,
    quantity: Joi.number().integer().min(1).default(1),
  }),
};

const updateCartSchema = {
  params: Joi.object({
    productId: objectId,
  }),

  body: Joi.object({
    action: Joi.string()
      .valid("increment", "decrement")
      .required(),
  }),
};

const removeCartItemSchema = {
  params: Joi.object({
    productId: objectId,
  }),
};

export {
  addToCartSchema,
  updateCartSchema,
  removeCartItemSchema,
};