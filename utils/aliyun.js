const multer = require("multer");
const MAO = require("multer-aliyun-oss");
const OSS = require("ali-oss");
const { BadRequestError } = require("../utils/errors");

const config = {
  region: process.env.ALIYUN_OSS_REGION,
  accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID,
  accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET,
  bucket: process.env.ALIYUN_OSS_BUCKET,
};

const client = new OSS(config);

const upload = multer({
  storage: MAO({
    config: config,
  }),
  limits: {
    fileSize: 1024 * 1024 * 5, //限制文件大小 5MB
  },
  fileFilter: function (req, file, cb) {
    const fileType = file.mimetype;
    const isImage = fileType.startsWith("image/");
    if (!isImage) {
      return cb(new BadRequestError("只能上传图片"));
    }
    cb(null, true);
  },
});

//单文件上传，指定表单字段名为file，并添加destination配置
const singleFileUpload = (destination) => {
  return (req, res, next) => {
    const uploadWithDestination = multer({
      storage: MAO({
        config: config,
        destination: destination, // 从参数获取destination
      }),
      limits: {
        fileSize: 1024 * 1024 * 5, //限制文件大小 5MB
      },
      fileFilter: function (req, file, cb) {
        const fileType = file.mimetype;
        const isImage = fileType.startsWith("image/");
        if (!isImage) {
          return cb(new BadRequestError("只能上传图片"));
        }
        cb(null, true);
      },
    }).single("file");

    uploadWithDestination(req, res, (err) => {
      if (err) {
        return next(err);
      }
      next();
    });
  };
};

// 多文件上传，指定表单字段名为file，并添加destination配置
const multiFileUpload = (destination) => {
  return (req, res, next) => {
    const uploadWithDestination = multer({
      storage: MAO({
        config: config,
        destination: destination, // 从参数获取destination
      }),
      limits: {
        fileSize: 1024 * 1024 * 5, //限制文件大小 5MB
      },
      fileFilter: function (req, file, cb) {
        const fileType = file.mimetype;
        const isImage = fileType.startsWith("image/");
        if (!isImage) {
          return cb(new BadRequestError("只能上传图片"));
        }
        cb(null, true);
      },
    }).array("file");

    uploadWithDestination(req, res, (err) => {
      if (err) {
        return next(err);
      }
      next();
    });
  };
};

module.exports = {
  config,
  client,
  singleFileUpload,
  multiFileUpload,
};
