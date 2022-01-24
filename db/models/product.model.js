const { Model, DataTypes, Sequelize, UUIDV4 } = require('sequelize');
const { CATEGORY_TABLE } = require('./../models/category.model');

const PRODUCTS_TABLE = 'products';
const ProductSchema = {
  /** ID, name price img */
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
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
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.UUID,
    references: {
      model: CATEGORY_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};
class Product extends Model {
  static associate(models) {
    Product.belongsTo(models.Category, {
      as: 'category',
    });
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
