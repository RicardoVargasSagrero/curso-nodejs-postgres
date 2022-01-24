const Joi = require('joi');

const id = Joi.string();
const customerId = Joi.string();
const estado = Joi.string().min(2).max(25);
/**
 * Order has Products
 */
const orderId = Joi.string();
const productId = Joi.string();
const amount = Joi.number().integer();

const getOrderSchema = Joi.object({
  id: id.required(),
});
const createOrderSchema = Joi.object({
  customerId: customerId.required(),
  estado: estado.required(),
});
const updateOrderSchema = Joi.object({
  id,
  estado,
});

const addItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required(),
});

module.exports = {
  getOrderSchema,
  createOrderSchema,
  updateOrderSchema,
  addItemSchema
};
