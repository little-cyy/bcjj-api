"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LoginLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LoginLog.init(
    {
      username: DataTypes.STRING,
      ip: DataTypes.STRING,
      address: DataTypes.STRING,
      browser: DataTypes.STRING,
      os: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      message: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "LoginLog",
    }
  );
  return LoginLog;
};
