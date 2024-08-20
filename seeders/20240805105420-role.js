"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("roles", [
      {
        name: "普通用户",
        code: "0",
        menus: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "管理员",
        code: "1",
        menus: "10010,10011,10012,10013,10020,10021,10030,10031",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "超级管理员",
        code: "100",
        menus: "10010,10011,10012,10013,10020,10021,10030,10031,10032,10033",
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
