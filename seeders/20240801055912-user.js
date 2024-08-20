"use strict";

/** @type {import('sequelize-cli').Migration} */
const { sample } = require("../utils/collection");
const bcrypt = require("bcryptjs");
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
    let users = [
      {
        username: "superadmin",
        email: "superadmin@example.com",
        password: bcrypt.hashSync("123123", 10),
        nickName: "超级管理员",
        sex: 2,
        role: 100,
        state: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    const counts1 = 5;

    for (let i = 1; i <= counts1; i++) {
      const user = {
        username: `admin${i}`,
        email: `admin${i}@example.com`,
        password: bcrypt.hashSync("123123", 10),
        nickName: `管理员${i}`,
        sex: sample([0, 1, 2]),
        role: 1,
        state: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      users.push(user);
    }
    const counts2 = 10;

    for (let i = 1; i <= counts2; i++) {
      const user = {
        username: `user${i}`,
        email: `user${i}@example.com`,
        password: bcrypt.hashSync("123123", 10),
        nickName: `普通用户${i}`,
        sex: sample([0, 1, 2]),
        role: 0,
        state: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      users.push(user);
    }

    await queryInterface.bulkInsert("Users", users, {});
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
