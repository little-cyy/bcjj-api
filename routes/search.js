const express = require("express");
const router = express.Router();
const { Course, Category, User, Chapter } = require("../models");
const { Op } = require("sequelize");
const { NotFoundError } = require("../utils/errors");
const { successResponse, failureResponse } = require("../utils/responses");

/**
 * 获取课程列表
 * GET /courses
 */
router.get("/", async function (req, res) {
  try {
    let { name, currentPage, paegSize } = req.query;
    currentPage = Math.abs(currentPage) || 1; //当前页码
    paegSize = Math.abs(paegSize) || 10; //每页显示多少条数据
    let condition = {
      attributes: { exclude: ["CategoryId", "UserId", "cotent"] },
      order: [["id", "ASC"]],
      offset: (currentPage - 1) * paegSize,
      limit: paegSize,
      where: {},
    };
    if (name) {
      condition.where.name = {
        [Op.like]: `%${name}%`,
      };
    }

    //findAndCountAll 方法同时查询数据总数和分页数据
    const { count, rows } = await Course.findAndCountAll(condition);
    successResponse(res, "搜索课程列表成功", {
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
 * 课程详情：
 * GET /course/{id}
 */
router.get("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const condition = {
      attributes: { exclude: ["CategoryId", "UserId"] },
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
        {
          model: Chapter,
          as: "chapters",
          attributes: ["id", "title", "rank", "createdAt"],
          order: [
            ["rank", "ASC"],
            ["id", "DESC"],
          ],
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "nickname", "avatar", "company"],
        },
      ],
    };
    const course = await Course.findByPk(id, condition);
    if (!course) {
      throw new NotFoundError(`ID：${id}的课程不存在`);
    }
    successResponse(res, "查询课程详情成功", course);
  } catch (error) {
    failureResponse(res, error);
  }
});

module.exports = router;
