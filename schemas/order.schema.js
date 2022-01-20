const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const estado = Joi.string().min(2).max(25);
/**
 * Order has Products
 */
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
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
