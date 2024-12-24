const multer = require("multer");
/**
 * @param {any} res
 * @param {any} message
 * @param {any} data
 * @returns  {any}
 * @description   请求成功返回
 */
function successResponse(res, message, data) {
  res.json({
    message,
    status: true,
    data,
  });
}

/**
 * @param {any} res
 * @param {any} error
 * @returns {any}
 * @description   请求失败返回
 */
function failureResponse(res, error) {
  let statusCode = 500;
  let message = "服务器错误";
  let errors = error;
  if (error.name === "SequelizeValidationError") {
    statusCode = 400;
    message = "请求参数错误";
    errors = error.errors.map((e) => e.message);
  } else if (error.name === "BadRequestError") {
    statusCode = 400;
    message = "错误的请求";
    errors = error.message;
  } else if (error.name === "UnauthorizedError") {
    statusCode = 401;
    message = "认证失败";
    errors = error.message;
  } else if (error.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "认证失败";
    errors = "您提交的token无效，请重新登录";
  } else if (error.name === "TokenExpiredError") {
    statusCode = 401;
    message = "认证失败";
    errors = "您提交的token已过期，请重新登录";
  } else if (error.name === "NotFoundError") {
    statusCode = 404;
    message = "资源不存在";
    errors = error.message;
  } else if (error.name === "ConflictError") {
    statusCode = 409;
    message = "请求存在冲突";
    errors = error.message;
  } else if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      statusCode = 413;
      message = "文件大小超过限制";
      errors = "文件大小超过限制，请上传小于10MB的文件";
    } else {
      statusCode = 400;
      message = "错误的请求";
      errors = error.message;
    }
  }
  return res.status(statusCode).json({
    message: message,
    status: false,
    error: Array.isArray(errors) ? errors : [errors],
  });
}

module.exports = { successResponse, failureResponse };
