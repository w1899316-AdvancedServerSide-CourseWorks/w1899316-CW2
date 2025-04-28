const express = require('express');
const userController = require('../controllers/user_controller');
const userRouter = express.Router();
userRouter.get('/',(req, res)=>{
    return res.status(200).json({"status":"this is the user service"})
})


userRouter.post('/register', userController.registerUserApi);
userRouter.post('/login', userController.loginApi);
userRouter.post('/logout', userController.logoutApi);
userRouter.get('/session', userController.getUserFromTheSessionApi);
userRouter.get('/user', userController.getUserApi);
userRouter.get('/all', userController.getAllUsersApi);
userRouter.put('/', userController.updateUserApi);
userRouter.delete('/', userController.deleteUserApi);

module.exports = userRouter;
