const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(255);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10);
const image = Joi.string().uri();
const categoryId = Joi.number().integer();
const products = Joi.object();

/**
 * Rango de precios
 */
const price_min = Joi.number();
const price_max = Joi.number();

/**
 * Paginacion
 */
const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required(),
});

const createProductsSchema = Joi.object({
  products: products,
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  description: description,
  categoryId,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max: Joi.alternatives().conditional('price_min', {
    is: Joi.number(),
    then: Joi.required(),
  })
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
  createProductsSchema,
};
