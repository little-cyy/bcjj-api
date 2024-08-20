const express = require("express");
const router = express.Router();
const { Category, Course, Menu } = require("../../models");
const { successResponse, failureResponse } = require("../../utils/responses");

/**
 * 获取字典接口：
 * GET /admin/dictionaries
 * 参数：dicType
 */
router.get("/", async (req, res) => {
  try {
    const { dicType } = req.query;
    let data;
    //#region category
    if (dicType === "category") {
      data = await Category.findAll({
        attributes: [
          ["id", "value"],
          ["name", "label"],
        ],
      });
    } else if (dicType === "course") {
      data = await Course.findAll({
        attributes: [
          ["id", "value"],
          ["name", "label"],
        ],
      });
    } else if (dicType === "menu") {
      data = await Menu.findAll({
        attributes: [
          "id",
          "pId",
          "path",
          ["code", "value"],
          ["title", "label"],
        ],
      });
    }
    //#endregion
    successResponse(res, "查询字典成功", data);
  } catch (error) {
    failureResponse(res, error);
  }
});

module.exports = router;
