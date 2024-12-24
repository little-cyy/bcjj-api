/**
 *  BadRequestError - 返回400错误
 */
class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
  }
}

/**
 * UnauthorizedError - 返回401错误
 */
class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
  }
}

/**
 * NotFoundError  - 返回404错误
 */
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
  }
}

/**
 * ConflictError  - 返回409错误
 */
class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = "ConflictError";
  }
}
module.exports = {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  ConflictError,
};
