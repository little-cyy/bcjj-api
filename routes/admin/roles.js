const express = require("express");
const router = express.Router();
const { Role } = require("../../models");
const { Op } = require("sequelize");
const { successResponse, failureResponse } = require("../../utils/responses");

/**
 * 获取角色列表：
 * GET /admin/roles
 */
router.get("/", async function (req, res) {
  try {
    let condition = {
      order: [["id", "ASC"]],
      where: {
        code: {
          [Op.eq]: 1,
        },
      },
    };

    //findAndCountAll 方法同时查询数据总数和分页数据
    const result = await Role.findAll(condition);
    //将菜单code字符串转换为数组
    result.forEach((item) => {
      if (!item.menus) {
        return (item.menus = []);
      }
      item.menus = item.menus.split(",")?.map((code) => code && Number(code));
      // 添加 editDisabled 列
      item.dataValues.editDisabled = req.user.role !== 100;
    });
    successResponse(res, "查询角色列表成功", {
      list: result,
    });
  } catch (error) {
    failureResponse(res, error);
  }
});

/**
 * 修改角色列表
 * PUT /admin/roles/:id
 */
router.put("/:id", async function (req, res) {
  try {
    const role = await getRole(req);
    const body = filterBody(req);
    await role.update(body);
    successResponse(res, "修改角色成功");
  } catch (error) {
    failureResponse(res, error);
  }
});

module.exports = router;

async function getRole(req) {
  const { id } = req.params;
  const role = await Role.findByPk(id);
  if (!role) {
    throw new NotFoundError(`ID:${id}的角色未找到`);
  }
  return role;
}

/**
 * @param {Request} req
 * @returns   {Object}
 * @description  过滤请求体
 */
function filterBody(req) {
  const { menus, name, code } = req.body;
  return {
    menus: menus.join(","),
    name,
    code,
  };
}
