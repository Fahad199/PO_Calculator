const { DataTypes } = require('sequelize');

module.exports = {
  csvProjectSchema: {
    Supplier: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Product: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Rate: {
      type: DataTypes.BLOB('float'),
      allowNull: false,
    },
    Unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Mat_Req: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    Mat_Incl: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
  },

  userSchema: {
    Id: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  invoiceSchema: {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Invoice: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
};
