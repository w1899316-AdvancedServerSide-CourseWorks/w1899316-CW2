const express = require('express');
const userController = require('../controllers/user_controller');
const { authenticateTokenCookie } = require('../middlewares/authMiddleware');
const userRouter = express.Router();
userRouter.get('/',(req, res)=>{
    return res.status(200).json({"status":"this is the user service"})
})



userRouter.post('/register', userController.registerUserApi);
userRouter.post('/login', userController.loginApi);
userRouter.post('/logout',authenticateTokenCookie, userController.logoutApi);
userRouter.get('/session',authenticateTokenCookie, userController.getUserFromTheSessionApi);
userRouter.get('/user', userController.getUserApi);
userRouter.get('/all',authenticateTokenCookie, userController.getAllUsersApi);
userRouter.put('/',authenticateTokenCookie, userController.updateUserApi);
userRouter.delete('/',authenticateTokenCookie, userController.deleteUserApi);

module.exports = userRouter;
