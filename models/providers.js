const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('providers', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    icon: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    key: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    payment: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    percent: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0.0
    }
  }, {
    sequelize,
    tableName: 'providers',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PK_providers",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
