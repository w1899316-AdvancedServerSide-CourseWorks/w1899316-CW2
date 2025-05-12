const FollowDao = require("../dao/follow_dao");
const logger = require("../middlewares/logger/winstonLogger");
const CustomError = require("../utils/errorHandler");

class FollowService {

    constructor() {
        this.followDao = new FollowDao();
    }

    async followUser_service(followerId, followingId) {
        try {
        return await this.followDao.createFollow(followerId, followingId);
        } catch (err) {
        logger.error({
            message: "Error in followUser_service",
            errorMessage: err.message,
            stack: err.stack,
            followerId,
            followingId
        });
        throw new CustomError(500, "Internal server error");
        }
    }

    async unfollowUser_service(followId) {
        try {
        const changes = await this.followDao.deleteFollow(followId);
        if (changes === 0) throw new CustomError(404, "Follow relationship not found");
        } catch (err) {
        if (err instanceof CustomError) throw err;
        logger.error({
            message: "Error in unfollowUser_service",
            errorMessage: err.message,
            stack: err.stack,
            followId
        });
        throw new CustomError(500, "Internal server error");
        }
    }

    async getFollowers_service(userId) {
        try {
        return await this.followDao.getFollowers(userId);
        } catch (err) {
        logger.error({
            message: "Error in getFollowers_service",
            errorMessage: err.message,
            stack: err.stack,
            userId
        });
        throw new CustomError(500, "Internal server error");
        }
    }

    async getFollowing_service(userId) {
        try {
        return await this.followDao.getFollowing(userId);
        } catch (err) {
        logger.error({
            message: "Error in getFollowing_service",
            errorMessage: err.message,
            stack: err.stack,
            userId
        });
        throw new CustomError(500, "Internal server error");
        }
    }
    async getFollowersCount_service(userId) {
        try {
            return await this.followDao.getFollowersCount(userId);
        } catch (err) {
            logger.error({
                message: "Error in getFollowersCount_service",
                errorMessage: err.message,
                stack: err.stack,
                userId
            });
            throw new CustomError(500, "Internal server error");
        }
    }
    async getFollowingCount_service(userId) {
        try {
            return await this.followDao.getFollowingCount(userId);
        } catch (err) {
            logger.error({
                message: "Error in getFollowingCount_service",
                errorMessage: err.message,
                stack: err.stack,
                userId
            });
            throw new CustomError(500, "Internal server error");
        }
    }
}

module.exports = FollowService;
