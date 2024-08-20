const express = require("express");
const router = express.Router();
const { User } = require("../models");
const { NotFoundError, BadRequestError } = require("../utils/errors");
const { successResponse, failureResponse } = require("../utils/responses");
const { decrypt } = require("../utils/generateKey");
const bcrypt = require("bcryptjs");
/**
 * 查询当前用户信息
 * GET /user/me
 */
router.get("/me", async function (req, res) {
  try {
    const user = await getUsers(req);
    successResponse(res, "查询当前用户信息成功", user);
  } catch (error) {
    failureResponse(res, error);
  }
});

/**
 * 更新用户信息
 * PUT /admin/users/info
 */
router.put("/info", async function (req, res) {
  try {
    const user = await getUsers(req);
    const { nickname, sex, company, introduce, avatar } = req.body;
    const body = { nickname, sex, company, introduce, avatar };
    await user.update(body);
    successResponse(res, "更新用户成功", user);
  } catch (error) {
    failureResponse(res, error);
  }
});

/**
 * 更新账户信息
 * PUT /admin/users/account
 */
router.put("/account", async function (req, res) {
  try {
    const user = await getUsers(req, true);
    const { email, username, password, newPassword, newPasswordConfirmation } =
      req.body;
    if (!password) {
      throw new BadRequestError("当前密码必须填写");
    }
    if (newPassword !== newPasswordConfirmation) {
      throw new BadRequestError("新密码和确认密码不一致");
    }
    //验证密码
    const pwd = decrypt(password) || password;
    const isPasswordValid = bcrypt.compareSync(pwd, user.password);
    if (!isPasswordValid) {
      throw new BadRequestError("当前密码错误");
    }
    const body = { email, username, password: newPassword };
    await user.update(body);
    delete user.dataValues.password;
    successResponse(res, "更新用户成功", user);
  } catch (error) {
    failureResponse(res, error);
  }
});

module.exports = router;

/**
 * @param {Request} req
 * @param {Boolean} showPwd
 * @returns   {User}
 * @description  获取用户
 */
async function getUsers(req, showPwd = false) {
  const id = req.userId;
  let condition = {};
  if (!showPwd) {
    condition = {
      attributes: { exclude: ["password"] },
    };
  }
  const user = await User.findByPk(id, condition);
  if (!user) {
    throw new NotFoundError(`ID:${id}的用户未找到`);
  }
  return user;
}
