const ReactionDao = require("../dao/reaction_dao");
const logger = require("../middlewares/logger/winstonLogger");
const CustomError = require("../utils/errorHandler");

class ReactionService {
    constructor() {
        this.reactionDao = new ReactionDao();
    }

    async createReaction_service(userId, postId, type) {
        try {
            return await this.reactionDao.createReaction(userId, postId, type);
        } catch (err) {
            logger.error({ message: "Error in createReaction_service", errorMessage: err.message, stack: err.stack, userId, postId, type });
            throw new CustomError(500, "Internal server error");
        }
    }

    async getReactionById_service(reactionId) {
        try {
            const result = await this.reactionDao.getReactionById(reactionId);
            if (!result) throw new CustomError(404, "Reaction not found");
            return result;
        } catch (err) {
            if (err instanceof CustomError) throw err;
            logger.error({ message: "Error in getReactionById_service", errorMessage: err.message, stack: err.stack, reactionId });
            throw new CustomError(500, "Internal server error");
        }
    }

    async getReactionByUserAndPost_service(userId, postId) {
        try {
            return await this.reactionDao.getReactionByUserAndPost(userId, postId);
        } catch (err) {
            logger.error({ message: "Error in getReactionByUserAndPost_service", errorMessage: err.message, stack: err.stack, userId, postId });
            throw new CustomError(500, "Internal server error");
        }
    }

    async getReactionsByPostId_service(postId) {
        try {
            return await this.reactionDao.getReactionsByPostId(postId);
        } catch (err) {
            logger.error({ message: "Error in getReactionsByPostId_service", errorMessage: err.message, stack: err.stack, postId });
            throw new CustomError(500, "Internal server error");
        }
    }

    async getReactionsByUserId_service(userId) {
        try {
            return await this.reactionDao.getReactionsByUserId(userId);
        } catch (err) {
            logger.error({ message: "Error in getReactionsByUserId_service", errorMessage: err.message, stack: err.stack, userId });
            throw new CustomError(500, "Internal server error");
        }
    }

    async countLikes_service(postId) {
        try {
            return await this.reactionDao.countLikes(postId);
        } catch (err) {
            logger.error({ message: "Error in countLikes_service", errorMessage: err.message, stack: err.stack, postId });
            throw new CustomError(500, "Internal server error");
        }
    }

    async countDislikes_service(postId) {
        try {
            return await this.reactionDao.countDislikes(postId);
        } catch (err) {
            logger.error({ message: "Error in countDislikes_service", errorMessage: err.message, stack: err.stack, postId });
            throw new CustomError(500, "Internal server error");
        }
    }

    async updateReaction_service(reactionId, type) {
        try {
            const updated = await this.reactionDao.updateReaction(reactionId, type);
            if (!updated) throw new CustomError(404, "Reaction not found");
            return updated;
        } catch (err) {
            if (err instanceof CustomError) throw err;
            logger.error({ message: "Error in updateReaction_service", errorMessage: err.message, stack: err.stack, reactionId, type });
            throw new CustomError(500, "Internal server error");
        }
    }

    async deleteReaction_service(reactionId) {
        try {
            const changes = await this.reactionDao.deleteReaction(reactionId);
            if (changes === 0) throw new CustomError(404, "Reaction not found");
        } catch (err) {
            if (err instanceof CustomError) throw err;
            logger.error({ message: "Error in deleteReaction_service", errorMessage: err.message, stack: err.stack, reactionId });
            throw new CustomError(500, "Internal server error");
        }
    }
}

module.exports = ReactionService;
