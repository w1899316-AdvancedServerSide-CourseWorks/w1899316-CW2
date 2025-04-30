const ReactionService = require("../services/reaction_service");

class ReactionController {
    constructor() {
            this.reactionService               = new ReactionService();
            this.createReactionApi             = this.createReactionApi.bind(this);
            this.getReactionByIdApi            = this.getReactionByIdApi.bind(this);
            this.getReactionByUserAndPostApi   = this.getReactionByUserAndPostApi.bind(this);
            this.getReactionsByPostIdApi       = this.getReactionsByPostIdApi.bind(this);
            this.getReactionsByUserIdApi       = this.getReactionsByUserIdApi.bind(this);
            this.countLikesApi                 = this.countLikesApi.bind(this);
            this.countDislikesApi              = this.countDislikesApi.bind(this);
            this.updateReactionApi             = this.updateReactionApi.bind(this);
            this.deleteReactionApi             = this.deleteReactionApi.bind(this);
    }

    async createReactionApi(req, res, next) {
        try {
            const { userId, postId, type } = req.body;
            const reaction = await this.reactionService.createReaction_service(userId, postId, type);
            res.status(201).json(reaction);
        } catch (err) {
            next(err);
        }
    }

    async getReactionByIdApi(req, res, next) {
        try {
            const { reactionId } = req.query;
            const reaction = await this.reactionService.getReactionById_service(reactionId);
            res.status(200).json(reaction);
        } catch (err) {
            next(err);
        }
    }

    async getReactionByUserAndPostApi(req, res, next) {
        try {
            const { userId, postId } = req.query;
            const reaction = await this.reactionService.getReactionByUserAndPost_service(userId, postId);
            res.status(200).json(reaction);
        } catch (err) {
            next(err);
        }
    }

    async getReactionsByPostIdApi(req, res, next) {
        try {
            const { postId } = req.query;
            const reactions = await this.reactionService.getReactionsByPostId_service(postId);
            res.status(200).json(reactions);
        } catch (err) {
            next(err);
        }
    }

    async getReactionsByUserIdApi(req, res, next) {
        try {
            const { userId } = req.query;
            const reactions = await this.reactionService.getReactionsByUserId_service(userId);
            res.status(200).json(reactions);
        } catch (err) {
            next(err);
        }
    }

    async countLikesApi(req, res, next) {
        try {
            const { postId } = req.query;
            const count = await this.reactionService.countLikes_service(postId);
            res.status(200).json({ postId, likes: count });
        } catch (err) {
            next(err);
        }
    }

    async countDislikesApi(req, res, next) {
        try {
            const { postId } = req.query;
            const count = await this.reactionService.countDislikes_service(postId);
            res.status(200).json({ postId, dislikes: count });
        } catch (err) {
            next(err);
        }
    }

    async updateReactionApi(req, res, next) {
        try {
            const { reactionId, type } = req.body;
            const updated = await this.reactionService.updateReaction_service(reactionId, type);
            res.status(200).json(updated);
        } catch (err) {
            next(err);
        }
    }

    async deleteReactionApi(req, res, next) {
        try {
            const { reactionId } = req.query;
            await this.reactionService.deleteReaction_service(reactionId);
            res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new ReactionController();
