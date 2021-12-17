const { Model, DataTypes, Sequelize } = require('sequelize');

const CUSTUMER_TABLE = 'customers';

const CustumerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
};

class Custumer extends Model {
  static associate() {
    //
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTUMER_TABLE,
      modelName: 'Customer',
      timestamps: false,
    };
  }
}

module.export = { Custumer, CustumerSchema, CUSTUMER_TABLE };
