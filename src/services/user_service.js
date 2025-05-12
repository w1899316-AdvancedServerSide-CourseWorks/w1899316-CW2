const UserDao      = require("../dao/user_dao");
const logger       = require("../middlewares/logger/winstonLogger");
const CustomError  = require("../utils/errorHandler");
const { generateHash, verify } = require("../utils/hashUtils");

class UserService {
  constructor() {
    this.userDao = new UserDao();
  }

  async createUser_service(user) {
    try {
      user.password = await generateHash(user.password);
      const created = await this.userDao.createUser(user);
      delete created.password;
      return created;
    } catch (err) {
      logger.error({
        message: "Error in createUser_service",
        errorMessage: err.message,
        stack: err.stack,
        userPayload: { email: user.email, firstName: user.firstName }
      });
      if (err.message.includes("UNIQUE constraint failed: users.email")) {
        throw new CustomError(409, "Email already in use");
      }
      throw new CustomError(500, "Internal server error");
    }
  }


  async loginUser(creds) {
    try {
      const user = await this.userDao.getUserByEmail(creds.email);
      if (!user) {
        throw new CustomError(404, "User not found");
      }
      const valid = await verify(creds.password, user.password);
      if (!valid) {
        throw new CustomError(401, "Invalid credentials");
      }
      
      delete user.password;
      return user;
    } catch (err) {
      
      if (err instanceof CustomError) throw err;
      logger.error({
        message: "Error in loginUser",
        errorMessage: err.message,
        stack: err.stack,
        loginPayload: { email: creds.email }
      });
      throw new CustomError(500, "Internal server error");
    }
  }

  async getUserById_service(userId) {
    try {
      const user = await this.userDao.getUserByUserId(userId);
      if (!user) throw new CustomError(404, "User not found");
      delete user.password;
      return user;
    } catch (err) {
      if (err instanceof CustomError) throw err;
      logger.error({
        message: "Error in getUserById_service",
        errorMessage: err.message,
        stack: err.stack,
        userId
      });
      throw new CustomError(500, "Internal server error");
    }
  }

  async getAllUsers_service() {
    try {
      const users = await this.userDao.getAllUsers();
      return users.map(u => {
        const { password, ...rest } = u;
        return rest;
      });
    } catch (err) {
      logger.error({
        message: "Error in getAllUsers_service",
        errorMessage: err.message,
        stack: err.stack
      });
      throw new CustomError(500, "Internal server error");
    }
  }

  async updateUser_service(userId, updates) {
    try {
      if (updates.password) {
        updates.password = await generateHash(updates.password);
      }
      updates.userId = userId;
      const updated = await this.userDao.updateUser(updates);
      if (!updated) throw new CustomError(404, "User not found");
      delete updated.password;
      return updated;
    } catch (err) {
      if (err instanceof CustomError) throw err;
      logger.error({
        message: "Error in updateUser_service",
        errorMessage: err.message,
        stack: err.stack,
        userId,
        updates: { ...updates, password: updates.password ? "[HASHED]" : undefined }
      });
      throw new CustomError(500, "Internal server error");
    }
  }

  async deleteUser_service(userId) {
    try {
      const changes = await this.userDao.deleteUser(userId);
      if (changes === 0) {
        throw new CustomError(404, "User not found");
      }
    } catch (err) {
      if (err instanceof CustomError) throw err;
      logger.error({
        message: "Error in deleteUser_service",
        errorMessage: err.message,
        stack: err.stack,
        userId
      });
      throw new CustomError(500, "Internal server error");
    }
  }
}

module.exports = UserService;
