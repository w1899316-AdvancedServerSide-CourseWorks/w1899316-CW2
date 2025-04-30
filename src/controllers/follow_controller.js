const FollowService = require("../services/follow_service");

class FollowController {
    constructor() {
        this.followService      = new FollowService();
        this.followUserApi      = this.followUserApi.bind(this);
        this.unfollowUserApi    = this.unfollowUserApi.bind(this);
        this.getFollowersApi    = this.getFollowersApi.bind(this);
        this.getFollowingApi    = this.getFollowingApi.bind(this);
        this.getFollowersCountApi  = this.getFollowersCountApi.bind(this);
        this.getFollowingCountApi  = this.getFollowingCountApi.bind(this);
    }

    async followUserApi(req, res, next) {
        try {
        const { followerId, followingId } = req.query;
        const follow = await this.followService.followUser_service(followerId, followingId);
        res.status(201).json(follow);
        } catch (err) {
        next(err);
        }
    }

    async unfollowUserApi(req, res, next) {
        try {
        const { followId } = req.query;
        await this.followService.unfollowUser_service(followId);
        res.sendStatus(200);
        } catch (err) {
        next(err);
        }
    }

    async getFollowersApi(req, res, next) {
        try {
        const { userId } = req.query;
        const followers = await this.followService.getFollowers_service(userId);
        res.status(200).json(followers);
        } catch (err) {
        next(err);
        }
    }

    async getFollowingApi(req, res, next) {
        try {
        const { userId } = req.query;
        const following = await this.followService.getFollowing_service(userId);
        res.status(200).json(following);
        } catch (err) {
        next(err);
        }
    }
    async getFollowersCountApi(req, res, next) {
        try {
            const { userId } = req.query;
            const count = await this.followService.getFollowersCount_service(userId);
            res.status(200).json({ userId, followersCount: count });
        } catch (err) {
            next(err);
        }
      }
    
    async getFollowingCountApi(req, res, next) {
        try {
            const { userId } = req.query;
            const count = await this.followService.getFollowingCount_service(userId);
            res.status(200).json({ userId, followingCount: count });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new FollowController();
