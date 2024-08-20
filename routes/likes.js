const express = require("express");
const router = express.Router();
const { Like, Course, User } = require("../models");
const { successResponse, failureResponse } = require("../utils/responses");

/**
 * 查找用户点赞过的课程
 * GET /likes
 */
router.get("/", async function (req, res) {
  try {
    let { currentPage, paegSize } = req.query;
    currentPage = Math.abs(currentPage) || 1; //当前页码
    paegSize = Math.abs(paegSize) || 10; //每页显示多少条数据
    const userId = req.userId;
    const user = await User.findByPk(userId);
    //查询当前用户点赞过的课程
    const conditon = {
      joinTableAttributes: [], //关联表属性
      attributes: { exlude: ["CategoryId", "UserId", "ontent"] },
      order: [["id", "ASC"]],
      offset: (currentPage - 1) * paegSize,
      limit: paegSize,
    };
    const courses = await user.getLikeCourses(conditon);
    const total = await user.countLikeCourses();
    successResponse(res, "查找当前用户点赞的课程成功", {
      list: courses,
      currentPage,
      paegSize,
      total,
    });
  } catch (error) {
    failureResponse(res, error);
  }
});

/**
 * 点赞、取消赞
 * PUT /likes
 */
router.put("/", async function (req, res) {
  try {
    const userId = req.userId;
    const { courseId } = req.body;
    const course = await Course.findByPk(courseId);
    if (!course) {
      throw new NotFoundError("课程不存在");
    }
    //检查该课程之前是否点赞过
    const like = await Like.findOne({ where: { userId, courseId } });
    if (like) {
      await like.destroy();
      await course.decrement("likesCount");
      successResponse(res, "取消赞成功");
    } else {
      await Like.create({ userId, courseId });
      await course.increment("likesCount");
      successResponse(res, "点赞成功");
    }
  } catch (error) {
    failureResponse(res, error);
  }
});

module.exports = router;

async function getLike(req) {
  const { id } = req.params;
  const like = await Like.findByPk(id);
  if (!like) {
    throw new NotFoundError(`ID:${id}的角色未找到`);
  }
  return like;
}
