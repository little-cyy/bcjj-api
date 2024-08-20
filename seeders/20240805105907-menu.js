"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   title: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Menus", [
      {
        pId: 0,
        title: "功能管理",
        path: "function-manage",
        name: "FunctionManage",
        code: 10010,
        order: 1,
        isShow: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pId: 0,
        title: "新闻通知",
        path: "news-notice",
        name: "NewsNotice",
        code: 10020,
        order: 2,
        isShow: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pId: 0,
        title: "系统管理",
        path: "system-manage",
        name: "SystemManage",
        code: 10030,
        order: 3,
        isShow: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pId: 1,
        title: "分类管理",
        path: "category-manage",
        name: "CategoryManage",
        code: 10011,
        order: 1,
        isShow: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pId: 1,
        title: "课程管理",
        path: "course-manage",
        name: "CourseManage",
        code: 10012,
        order: 2,
        isShow: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pId: 1,
        title: "章节管理",
        path: "chapter-manage",
        name: "ChapterManage",
        code: 10013,
        order: 3,
        isShow: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        pId: 2,
        title: "文章管理",
        path: "article-manage",
        name: "ArticleManage",
        code: 10021,
        order: 1,
        isShow: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pId: 3,
        title: "用户管理",
        path: "user-manage",
        name: "UserManage",
        code: 10031,
        order: 1,
        isShow: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pId: 3,
        title: "权限设置",
        path: "permission-setting",
        name: "PermissionSetting",
        code: 10032,
        order: 1,
        isShow: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pId: 3,
        title: "菜单设置",
        path: "menu-setting",
        name: "MenuSetting",
        code: 10033,
        order: 1,
        isShow: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
