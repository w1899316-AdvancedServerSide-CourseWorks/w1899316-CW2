const express = require('express');
const follow_controller = require('../controllers/follow_controller');
const { authenticateTokenCookie } = require('../middlewares/authMiddleware');
const followRouter = express.Router();

followRouter.get('/',(req, res) => {
    return res.status(200).json({"message": "follow service"});
});

followRouter.post("/create", authenticateTokenCookie, follow_controller.followUserApi)
followRouter.delete("/unfollow/user", authenticateTokenCookie,follow_controller.unfollowUserApi)

followRouter.get("/find/followers", follow_controller.getFollowersApi)
followRouter.get("/find/following", follow_controller.getFollowingApi)
followRouter.get("/count/followers", follow_controller.getFollowersCountApi)
followRouter.get("/count/following", follow_controller.getFollowingCountApi)

module.exports = followRouter;