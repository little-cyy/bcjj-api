const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { UnauthorizedError } = require("../utils/errors");
const { failureResponse } = require("../utils/responses");

module.exports = async (req, res, next) => {
  try {
    //authorization格式为Bearer token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new UnauthorizedError("当前接口需要认证才能访问");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId } = decoded; // 从token中获取用户id
    req.userId = userId;
    next(); // 继续执行下一个中间件或路由处理函数
  } catch (error) {
    failureResponse(res, error);
  }
};
