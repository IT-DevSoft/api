const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payments', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    providerid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'providers',
        key: 'id'
      }
    },
    lic: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    orderid: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'payments',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "IX_payments_providerid",
        fields: [
          { name: "providerid" },
        ]
      },
      {
        name: "IX_payments_userid",
        fields: [
          { name: "userid" },
        ]
      },
      {
        name: "PK_payments",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
