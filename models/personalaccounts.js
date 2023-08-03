const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('personalaccounts', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'personalaccounts',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "IX_personalaccounts_providerid",
        fields: [
          { name: "providerid" },
        ]
      },
      {
        name: "IX_personalaccounts_userid",
        fields: [
          { name: "userid" },
        ]
      },
      {
        name: "PK_personalaccounts",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
