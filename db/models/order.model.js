const { Model, DataTypes, Sequelize, UUIDV4 } = require('sequelize');
const { CUSTOMER_TABLE } = require('./../models/customer.model');
const ORDER_TABLE = 'orders';

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.UUID,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  estado: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  total: {
    allowNull: true,
    type: DataTypes.VIRTUAL,
    get(){
      if(this.items && this.items.length > 0){
        return this.items.reduce((total, item) => {
          return total + (item.price * item.OrderProduct.amount);
        },0)
      }
      return 0;
    }
  }
};

class Order extends Model {
  static associate(models) {
    Order.belongsTo(models.Customer, {
      as: 'customer',
    });
    Order.belongsToMany(models.Product, {
      as: 'items',
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId',
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false,
    };
  }
}

module.exports = { Order, OrderSchema, ORDER_TABLE };
