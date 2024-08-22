const express = require("express");
const router = express.Router();
const { User, sequelize } = require("../../models");
const { successResponse, failureResponse } = require("../../utils/responses");

/**
 * 查询用户性别分布
 * GET /admin/charts/sex
 */
router.get("/sex", async (req, res, next) => {
  try {
    const male = await User.count({ where: { sex: 0 } });
    const female = await User.count({ where: { sex: 1 } });
    const unknown = await User.count({ where: { sex: 2 } });
    successResponse(res, "查询用户性别", [
      { value: male, name: "男性" },
      { value: female, name: "女性" },
      { value: unknown, name: "未选择" },
    ]);
  } catch (error) {
    failureResponse(error);
  }
});

/**
 * 查询近一年每个月新增用户数
 * GET /admin/charts/userCount
 */
router.get("/userCount", async (req, res, next) => {
  try {
    const [result] = await sequelize.query(
      `
      SELECT 
          DATE_FORMAT(u.createdAt, '%Y-%m') AS month,
          COUNT(DISTINCT u.username) AS newUsers,
          COUNT(DISTINCT l.username) AS activeUsers
      FROM 
          users u
      LEFT JOIN 
          loginlogs l ON DATE_FORMAT(l.createdAt, '%Y-%m') = DATE_FORMAT(u.createdAt, '%Y-%m') AND l.status = 1
      WHERE 
          u.createdAt >= NOW() - INTERVAL 1 YEAR
      GROUP BY 
          DATE_FORMAT(u.createdAt, '%Y-%m')
      ORDER BY 
          DATE_FORMAT(u.createdAt, '%Y-%m');
      `
    );
    const data = {
      months: [],
      adduserCounts: [],
      activeuserCounts: [],
    };
    result.forEach((item) => {
      data.months.push(item.month);
      data.adduserCounts.push(item.newUsers);
      data.activeuserCounts.push(item.activeUsers);
    });
    successResponse(res, "查询每月用户数量成功", data);
  } catch (error) {
    failureResponse(error);
  }
});

/**
 * 查询每个分类课程数量
 * GET /admin/charts/courseCount
 */
router.get("/courseCount", async (req, res, next) => {
  try {
    const [result] = await sequelize.query(`
      SELECT categories.name AS category,COUNT(DISTINCT courses.name) AS courseCount
      FROM categories  
      LEFT JOIN courses  ON   categories.id= courses.categoryId
      GROUP BY categories.name
      ORDER BY categories.name;
      `);
    const data = {
      categories: [],
      courseCounts: [],
    };
    result.forEach((item) => {
      if (item.courseCount > 0) {
        data.categories.push(item.category);
        data.courseCounts.push(item.courseCount);
      }
    });
    successResponse(res, "查询每个分类课程数量成功", data);
  } catch (error) {
    failureResponse(error);
  }
});
module.exports = router;
