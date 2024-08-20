const express = require("express");
const router = express.Router();
const { successResponse, failureResponse } = require("../../utils/responses");
const { Op } = require("sequelize");
const { Menu, Role, LoginLog } = require("../../models");
/**
 * 当前登录用户详情
 * GET /admin/userbased/userInfo
 */
router.get("/userInfo", async function (req, res) {
  try {
    const { user } = req;
    let userObj = JSON.parse(JSON.stringify(user));
    delete userObj.password;
    const loginInfo = await LoginLog.findOne({
      where: {
        username: user.username,
      },
      attributes: ["address", ["createdAt", "lastLoginTime"]],
      order: [["createdAt", "DESC"]],
    });

    successResponse(res, "查询用户详情成功", { user: userObj, loginInfo });
  } catch (error) {
    failureResponse(res, error);
  }
});

/**
 * 通过权限获取菜单列表：
 * GET /admin/userbased/menus
 *
 * */
router.get("/menus", async function (req, res) {
  const { user } = req;
  try {
    const role = await Role.findOne({ where: { code: user.role } });
    let menu = await Menu.findAll({
      where: {
        isShow: 1,
        code: { [Op.in]: role.menus.split(",").map((it) => Number(it)) },
      },
    });

    successResponse(res, "查询菜单列表成功", menu);
  } catch (error) {
    failureResponse(res, error);
  }
});

module.exports = router;
