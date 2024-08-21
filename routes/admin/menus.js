const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { Menu } = require("../../models");
const { successResponse, failureResponse } = require("../../utils/responses");

/**
 * 获取菜单列表：
 * GET /admins/menu
 */
router.get("/", async function (req, res) {
  try {
    let { title, name, currentPage, paegSize } = req.query;
    currentPage = Math.abs(currentPage) || 1; //当前页码
    paegSize = Math.abs(paegSize) || 10; //每页显示多少条数据
    let condition = {
      order: [["id", "ASC"]],
      offset: (currentPage - 1) * paegSize,
      limit: paegSize,
      where: {},
    };
    if (title) {
      condition.where.title = {
        [Op.like]: `%${title}%`,
      };
    }
    if (name) {
      condition.where.name = {
        [Op.like]: `%${name}%`,
      };
    }
    //findAndCountAll 方法同时查询数据总数和分页数据
    const { rows, count } = await Menu.findAndCountAll(condition);
    // 添加 editDisabled 列
    rows.forEach((row) => {
      row.dataValues.editDisabled = req.user.role !== 100;
    });
    successResponse(res, "查询菜单列表成功", {
      list: rows,
      currentPage,
      paegSize,
      total: count,
    });
  } catch (error) {
    failureResponse(res, error);
  }
});

/**
 * 修改菜单列表
 * PUT /admin/menus/:id
 */
router.put("/:id", async function (req, res) {
  try {
    const menu = await getMenu(req);
    const body = filterBody(req);
    await menu.update(body);
    successResponse(res, "修改菜单成功");
  } catch (error) {
    failureResponse(res, error);
  }
});

module.exports = router;

async function getMenu(req) {
  const { id } = req.params;
  const menu = await Menu.findByPk(id);
  if (!menu) {
    throw new NotFoundError(`ID:${id}的菜单未找到`);
  }
  return menu;
}

/**
 * @param {Request} req
 * @returns   {Object}
 * @description  过滤请求体
 */
function filterBody(req) {
  const { code, name, isShow, order, path, title } = req.body;
  return {
    code,
    name,
    isShow,
    order,
    path,
    title,
  };
}
