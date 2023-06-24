class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = true;
  
      // Gắn stack trace của lỗi hiện tại
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = AppError;
  