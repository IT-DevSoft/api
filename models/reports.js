const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reports', {
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
    lic: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    hash: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    doc_date: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    providerid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'providers',
        key: 'id'
      }
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'reports',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "IX_reports_providerid",
        fields: [
          { name: "providerid" },
        ]
      },
      {
        name: "IX_reports_userid",
        fields: [
          { name: "userid" },
        ]
      },
      {
        name: "PK_reports",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
