const express = require("express");
const router = express.Router();
const { Chapter, Course, User } = require("../models");
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
/**
 * 创建章节
 * POST /chapters
 */
router.post("/", async function (req, res) {
  try {
    const body = filterBody(req);
    const chapter = await Chapter.create(body);
    successResponse(res, "创建章节成功", chapter);
  } catch (error) {
    failureResponse(res, error);
  }
});

/**
 * 删除章节
 * DELETE /chapters/{id}
 */
router.delete("/:id", async function (req, res) {
  try {
    const chapter = await getChapters(req);
    await chapter.destroy();
    successResponse(res, "删除章节成功");
  } catch (error) {
    failureResponse(res, error);
  }
});

/**
 * 更新章节
 * PUT /chapters/{id}
 */
router.put("/:id", async function (req, res) {
  try {
    const chapter = await getChapters(req);
    const body = filterBody(req);
    await chapter.update(body);
    successResponse(res, "更新章节成功", chapter);
  } catch (error) {
    failureResponse(res, error);
  }
});

/**
 * 批量删除章节
 * POST /chapters/batchDelete
 */
router.post("/batchDelete", async function (req, res) {
  try {
    const ids = req.body.ids;
    await Chapter.destroy({
      where: {
        id: ids,
      },
    });
    setTimeout(() => {
      successResponse(res, "批量删除章节成功");
    }, 3000);
  } catch (error) {
    failureResponse(res, error);
  }
});
module.exports = router;

/**
 * @param {Request} req
 * @returns   {Chapter}
 * @description  获取章节
 */
async function getChapters(req) {
  const { id } = req.params;
  const condition = getCondition();
  const chapter = await Chapter.findByPk(id, condition);
  if (!chapter) {
    throw new NotFoundError(`ID:${id}的章节未找到`);
  }
  return chapter;
}

/**
 * @returns   {object}
 * @description   获取查询公共条件
 */
function getCondition() {
  return {
    attributes: { exclude: ["CourseId"] },
    include: [
      { model: Course, as: "course", attributes: ["id", "name"] }, // 关联课程
    ],
  };
}
/**
 * @param {Request} req
 * @returns   {Object}
 * @description  过滤请求体
 */
function filterBody(req) {
  const { courseId, title, content, rank, video } = req.body;
  return {
    courseId,
    title,
    content,
    rank,
    video,
  };
}
