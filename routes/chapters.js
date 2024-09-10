const express = require("express");
const router = express.Router();
const { Chapter } = require("../models");
const { NotFoundError } = require("../utils/errors");
const { successResponse, failureResponse } = require("../utils/responses");

/**
 * 章节详情：
 * GET /chapters/{id}
 */
router.get("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    // 查询章节
    const chapter = await Chapter.findByPk(id, {
      attributes: { exclude: ["CourseId"] },
    });

    if (!chapter) {
      throw new NotFoundError(`ID：${id}的章节不存在`);
    }
    //获取关联的课程
    const course = await chapter.getCourse({
      attributes: ["id", "name", "userId"],
    });
    //获取关联的用户
    const user = await course.getUser({
      attributes: ["id", "username", "nickname", "avatar", "company"],
    });
    successResponse(res, "查询章节详情成功", {
      chapter,
      course,
      user,
    });
  } catch (error) {
    failureResponse(res, error);
  }
});

module.exports = router;
