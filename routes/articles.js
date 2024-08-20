const express = require("express");
const router = express.Router();
const { Article } = require("../models");
const { NotFoundError } = require("../utils/errors");
const { successResponse, failureResponse } = require("../utils/responses");

/**
 * 获取文章列表
 * GET /articles
 */
router.get("/", async function (req, res) {
  try {
    let { currentPage, paegSize } = req.query;
    currentPage = Math.abs(currentPage) || 1; //当前页码
    paegSize = Math.abs(paegSize) || 10; //每页显示多少条数据
    let condition = {
      attributes: { excludes: ["content"] },
      order: [["id", "DESC"]],
      offset: (currentPage - 1) * paegSize,
      limit: paegSize,
    };
    //findAndCountAll 方法同时查询数据总数和分页数据
    const { count, rows } = await Article.findAndCountAll(condition);
    successResponse(res, "查询文章列表成功", {
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
 * 文章详情：
 * GET /article/{id}
 */
router.get("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);
    if (!article) {
      throw new NotFoundError(`ID:${id}的文章不存在}`);
    }
    successResponse(res, "查询文章详情成功", article);
  } catch (error) {
    failureResponse(res, error);
  }
});

module.exports = router;
