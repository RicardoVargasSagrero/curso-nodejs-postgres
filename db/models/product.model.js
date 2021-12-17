const { Model, DataTypes, Sequelize } = require('sequelize');

const PRODUCTS_TABLE = 'products';
const ProductSchema = {
  /** ID, name price img */
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  price: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    fiel: 'create_at',
    defaultValue: Sequelize.NOW,
  },
};
class Product extends Model {
  static associate() {
    //models
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCTS_TABLE,
      modelName: 'Product',
      timestamps: false,
    };
  }
}
module.exports = {
  PRODUCTS_TABLE,
  ProductSchema,
  Product,
};
