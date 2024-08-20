"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Menu.init(
    {
      pId: {
        type: DataTypes.INTEGER,
        validate: {
          async isPresent(value) {
            if (!value) return;
            const category = await sequelize.models.Menu.findByPk(value);
            if (!category) {
              throw new Error(`ID为:${value}的菜单不存在`);
            }
          },
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "菜单标题必须填写" },
          notNull: { msg: "菜单标题不能为空" },
          len: {
            args: [1, 20],
            msg: "菜单标题长度在1到20之间",
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "菜单名字必须填写" },
          notNull: { msg: "菜单名字不能为空" },
          len: {
            args: [1, 20],
            msg: "菜单名字长度在1到20之间",
          },
        },
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "菜单路径必须填写" },
          notNull: { msg: "菜单路径不能为空" },
        },
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "菜单编码必须填写" },
          notNull: { msg: "菜单编码不能为空" },
        },
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "排序必须填写" },
          notEmpty: { msg: "排序不能为空" },
          isInt: { msg: "排序必须是整数" },
          isPositive(value) {
            if (value <= 0) {
              throw new Error("排序必须是一个正整数");
            }
          },
        },
      },
      isShow: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Menu",
    }
  );
  return Menu;
};
