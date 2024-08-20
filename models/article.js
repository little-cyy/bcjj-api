"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Article.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "标题必须填写",
          },
          notEmpty: {
            msg: "标题不能为空",
          },
          len: {
            args: [2, 45],
            msg: "标题长度需要在2到45个字符之间",
          },
          async isUnique(value) {
            const count = await Article.count({
              where: {
                title: value,
              },
            });
            if (count > 0) {
              throw new Error("标题已存在");
            }
          },
        },
      },
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Article",
    }
  );
  return Article;
};
