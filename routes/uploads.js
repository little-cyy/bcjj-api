const express = require("express");
const router = express.Router();
const { singleFileUpload, multiFileUpload } = require("../utils/aliyun");
const { successResponse, failureResponse } = require("../utils/responses");
const { BadRequestError } = require("../utils/errors");
const { Attachment } = require("../models");
/**
 * 阿里云 OSS客户端上传
 * POST /uploads/
 */
router.post("/", singleFileUpload("uploads"), uoloadFn);
router.post("/mdEditor", multiFileUpload("mdEditor"), uoloadFn);

async function uoloadFn(req, res) {
  try {
    let attachments;
    if (req.files && req.files.length > 0) {
      // 多文件上传
      attachments = await Promise.all(
        req.files.map((file) =>
          Attachment.create({
            ...file,
            userId: req.user.id,
            fullpath: file.path + "/" + file.filename,
          })
        )
      );
      successResponse(res, "上传成功", { files: attachments });
    } else if (req.file) {
      // 单文件上传
      await Attachment.create({
        ...req.file,
        userId: req.user.id,
        fullpath: req.file.path + "/" + req.file.filename,
      });
      successResponse(res, "上传成功", { fileurl: req.file.url });
    } else {
      // 没有文件上传
      return failureResponse(res, new BadRequestError("请选择要上传的文件"));
    }
  } catch (err) {
    failureResponse(res, err);
  }
}
module.exports = router;
