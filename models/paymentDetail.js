const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('paymentDetail', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ph_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    servicesid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sum: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    paymentQiwiid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'payments',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'paymentDetail',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "IX_paymentDetail_paymentQiwiid",
        fields: [
          { name: "paymentQiwiid" },
        ]
      },
      {
        name: "PK_paymentDetail",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
