class CustomError extends Error {
    constructor(status, message) {
      super(message);
      this.status = status;
      this.customMessage = message;
    }
  }
  
  module.exports = CustomError;
  