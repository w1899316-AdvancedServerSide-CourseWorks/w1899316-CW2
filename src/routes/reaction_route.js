const express = require('express');
const reactionController = require('../controllers/reaction_controller');
const reactionRouter = express.Router();

reactionRouter.get('/',(req, res) => {
    return res.status(200).json({"message": "reaction service"});
});
reactionRouter.post('/create', reactionController.createReactionApi);
reactionRouter.get('/find/reactionId', reactionController.getReactionByIdApi);
reactionRouter.get('/find/postId/userId', reactionController.getReactionByUserAndPostApi);
reactionRouter.get('/find/postId', reactionController.getReactionsByPostIdApi);
reactionRouter.get('/findall/userId', reactionController.getReactionsByUserIdApi);
reactionRouter.get('/count/likes/postId', reactionController.countLikesApi);
reactionRouter.get('/count/dislikes/postId', reactionController.countDislikesApi);
reactionRouter.put('/update/type/reactionId', reactionController.updateReactionApi);
reactionRouter.delete('/delete/reactionId', reactionController.deleteReactionApi);

module.exports = reactionRouter;