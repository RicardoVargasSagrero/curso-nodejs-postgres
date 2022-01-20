const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(2);
const lastName = Joi.string().min(2);
const phone = Joi.string()
  .length(10)
  .pattern(/^[0-9]+$/)
  .required();
const userId = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);

const getCustomerSchema = Joi.object({
  id: id.required(),
});

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: Joi.object({
    email: email.required(),
    password: password.required(),
  }),
});

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone,
  userId,
});

module.exports = {
  getCustomerSchema,
  createCustomerSchema,
  updateCustomerSchema,
};
