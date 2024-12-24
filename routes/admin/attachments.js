const express = require("express");
const router = express.Router();
const { Attachment, User } = require("../../models");
const { NotFoundError } = require("../../utils/errors");
const { successResponse, failureResponse } = require("../../utils/responses");
const { client } = require("../../utils/aliyun");

/**
 * 查询附件列表
 * GET /admin/attachments
 */
router.get("/", async (req, res) => {
  try {
    let { currentPage, paegSize } = req.query;
    currentPage = Math.abs(currentPage) || 1; //当前页码
    paegSize = Math.abs(paegSize) || 10; //每页显示多少条数据
    const condition = {
      order: [["id", "DESC"]],
      offset: (currentPage - 1) * paegSize,
      limit: paegSize,
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "avatar"],
        },
      ],
    };
    const { count, rows } = await Attachment.findAndCountAll(condition);
    successResponse(res, "查询附件列表成功", {
      list: rows,
      currentPage,
      paegSize,
      total: count,
    });
  } catch (e) {
    errorResponse(res, e);
  }
});

/**
 * 删除附件
 * DELETE /admin/attachments
 */
router.delete("/:id", async function (req, res) {
  try {
    const attachments = await getAttachment(req);
    //删除阿里云oss的文件
    await client.delete(attachments.fullpath);

    //删除数据库中的文件
    await attachments.destroy();

    successResponse(res, "删除附件成功");
  } catch (error) {
    failureResponse(res, error);
  }
});

/**
 * @param {Request} req
 * @returns   {Object}
 * @description  获取附件
 */
async function getAttachment(req) {
  const { id } = req.params;
  const attachments = await Attachment.findByPk(id);
  if (!attachments) {
    throw new NotFoundError(`ID:${id}的附件未找到`);
  }
  return attachments;
}
module.exports = router;
