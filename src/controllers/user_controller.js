const { getUserFromSession } = require("../middlewares/authMiddleware");
const UserService     = require("../services/user_service");
const { generateToken } = require("../utils/jwt");

class UserController {
  constructor() {
    this.userService = new UserService();
    this.registerUserApi  = this.registerUserApi.bind(this);
    this.loginApi = this.loginApi.bind(this);
    this.getUserApi = this.getUserApi.bind(this);
    this.getAllUsersApi = this.getAllUsersApi.bind(this);
    this.updateUserApi = this.updateUserApi.bind(this);
    this.deleteUserApi = this.deleteUserApi.bind(this);
    this.logoutApi = this.logoutApi.bind(this);
    this.getUserFromTheSessionApi = this.getUserFromTheSessionApi.bind(this);
  }

  async registerUserApi(req, res, next) {
    try {
      const user = await this.userService.createUser_service(req.body);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }


  async loginApi(req, res, next) {
    try {
      const user = await this.userService.loginUser(req.body);
      const token = generateToken(user);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600_000,
      });

      req.session.user = user;
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
  async logoutApi(req, res, next) {
    req.session = null;
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
  }
  async getUserFromTheSessionApi(req, res, next){
    try {
      const user = getUserFromSession(req)
      if(!user){
        return res.status(404).json({message:"user not found"})
      }
      return res.status(200).json(user)
    } catch (error) {
      next(error);
    }
  }
  async getUserApi(req, res, next) {
    try {
      const { userId } = req.query;
      const user = await this.userService.getUserById_service(userId);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  async getAllUsersApi(req, res, next) {
    try {
      const users = await this.userService.getAllUsers_service();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  async updateUserApi(req, res, next) {
    try {
      const { userId } = req.query;
      const updated = await this.userService.updateUser_service(userId, req.body);
      res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  }

  async deleteUserApi(req, res, next) {
    try {
      const { userId } = req.query;
      await this.userService.deleteUser_service(userId);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
