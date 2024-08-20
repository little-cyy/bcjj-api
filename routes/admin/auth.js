const express = require("express");
const router = express.Router();
const { User, LoginLog } = require("../../models");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { NotFoundError, BadRequestError } = require("../../utils/errors");
const { successResponse, failureResponse } = require("../../utils/responses");
const { decrypt } = require("../../utils/generateKey");
const { getAddressByIp, getUserAgent } = require("../../utils/getReqInfo");
/**
 * 管理员登录
 * @route POST /admin/auth/sign_in
 */
router.post("/sign_in", async (req, res, next) => {
  try {
    const { login, password } = req.body;
    if (!login) {
      throw new BadRequestError("用户名不能为空");
    }
    if (!password) {
      throw new BadRequestError("密码不能为空");
    }
    const condition = {
      where: {
        [Op.or]: [{ username: login }, { email: login }],
      },
    };
    const user = await User.findOne(condition);
    if (!user) {
      throw new NotFoundError("用户不存在");
    }
    const { id, username, nickname, email, role } = user;
    //验证密码
    const pwd = decrypt(password) || password;
    const isPasswordValid = bcrypt.compareSync(pwd, user.password);
    if (!isPasswordValid) {
      addLoginLog(req, username, false, "密码错误");
      throw new BadRequestError("密码错误");
    }
    // 验证是否是管理员
    const isAdmin = [1, 100].includes(user.role);
    if (!isAdmin) {
      addLoginLog(req, username, false, "不是管理员，无权限访问");
      throw new BadRequestError("您不是管理员，无权限访问");
    }
    // 生成token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    addLoginLog(req, username, true, "登录成功");
    successResponse(res, "登录成功", {
      token,
      userInfo: { id, username, nickname, email, role },
    });
  } catch (error) {
    failureResponse(res, error);
  }
});

module.exports = router;

function addLoginLog(req, username, status, message) {
  //TODO:记录登录日志
  //获取登录ip信息
  const ip = req.headers["x-forwarded-for"] || req.ip;
  if (ip.includes("::ffff:")) {
    ip = ip.split("::ffff:")[1];
  }
  const { province, city } = getAddressByIp(ip);
  const ctx = req.headers["user-agent"];
  const { family, os } = getUserAgent(ctx);
  const loginLog = {
    username,
    ip,
    address: getAddress(province, city),
    browser: family,
    os: os.toString(),
    status,
    message,
  };
  LoginLog.create(loginLog);
}
function getAddress(province, city) {
  if (province && city && province !== city) {
    return province + city;
  } else {
    return city;
  }
}
