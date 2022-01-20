const { User, UserSchema } = require('./user.model');
const { Product, ProductSchema } = require('./product.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Category, CategorySchema } = require('./category.model');
const { Order, OrderSchema } = require('./order.model');
const {OrderProduct, OrderProductSchema} = require('./order-product.model');

function setupModels(sequelize) {
  //Ejecutamos las inicializaciones
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

  //Ejecutamos la asociación,
  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);

}
module.exports = { setupModels };