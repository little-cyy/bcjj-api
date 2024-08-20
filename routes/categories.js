const express = require("express");
const router = express.Router();
const { Category } = require("../models");
const { successResponse, failureResponse } = require("../utils/responses");

/**
 * 获取分类列表
 * GET /categories
 */
router.get("/", async function (req, res) {
  try {
    let condition = {
      order: [
        ["rank", "ASC"],
        ["id", "DESC"],
      ],
    };

    const categories = await Category.findAll(condition);

    successResponse(res, "查询分类列表成功", categories);
  } catch (error) {
    failureResponse(res, error);
  }
});

module.exports = router;
