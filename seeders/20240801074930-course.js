"use strict";

const category = require("../models/category");

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
    let coureDatas = [];
    let course1 = [
      "HTML教程",
      "CSS教程",
      "原生JavaScript",
      "ECMAScript 6（es6）教程",
      "vue2教程",
      "vue3教程",
      "Type Script 教程",
      "React 教程",
    ];
    course1.forEach((item) => {
      coureDatas.push({
        categoryId: 1,
        userId: 1,
        name: item,
        recommended: false,
        introductory: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    let course2 = ["python教程", "Node.js教程", "PHP教程"];
    course2.forEach((item) => {
      coureDatas.push({
        categoryId: 2,
        userId: 1,
        name: item,
        recommended: false,
        introductory: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    let course3 = [
      "uniapp教程",
      "微信小程序教程",
      "React Native（移动端开发）课程",
    ];
    course3.forEach((item) => {
      coureDatas.push({
        categoryId: 3,
        userId: 1,
        name: item,
        recommended: false,
        introductory: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    let course4 = ["MySQL教程", "Oracle教程"];
    course4.forEach((item) => {
      coureDatas.push({
        categoryId: 4,
        userId: 1,
        name: item,
        recommended: false,
        introductory: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    let course5 = ["LINUX教程", "nginx教程", "Apache教程"];
    course5.forEach((item) => {
      coureDatas.push({
        categoryId: 5,
        userId: 1,
        name: item,
        recommended: false,
        introductory: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    await queryInterface.bulkInsert("Courses", coureDatas, {});
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
