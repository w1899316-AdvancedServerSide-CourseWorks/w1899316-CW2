const db = require('../config/db');

class FollowDao {
    constructor(){}
    createFollow(followerId, followingId) {
        return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO follows (followerId, followingId)
            VALUES (?, ?)
        `;
        db.run(sql, [followerId, followingId], function(err) {
            if (err) return reject(err);
            db.get(
            `
                SELECT followId, followerId, followingId, createdAt
                FROM follows
                WHERE followId = ?
            `,
            [this.lastID],
            (err, row) => {
                if (err) return reject(err);
                resolve(row);
            }
            );
        });
        });
    }
    deleteFollow(followId) {
        return new Promise((resolve, reject) => {
        const sql = `DELETE FROM follows WHERE followId = ?`;
        db.run(sql, [followId], function(err) {
            if (err) return reject(err);
            resolve(this.changes);
        });
        });
    }
    getFollowers(userId) {
        return new Promise((resolve, reject) => {
        const sql = `
            SELECT f.followId, f.followerId, u.firstName, u.lastName, f.createdAt
            FROM follows f
            JOIN users u ON f.followerId = u.userId
            WHERE f.followingId = ?
            ORDER BY f.createdAt DESC
        `;
        db.all(sql, [userId], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
        });
    }
    getFollowing(userId) {
        return new Promise((resolve, reject) => {
        const sql = `
            SELECT f.followId, f.followingId, u.firstName, u.lastName, f.createdAt
            FROM follows f
            JOIN users u ON f.followingId = u.userId
            WHERE f.followerId = ?
            ORDER BY f.createdAt DESC
        `;
        db.all(sql, [userId], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
        });
    }
    getFollowByUserIds(followerId, followingId) {
        return new Promise((resolve, reject) => {
        const sql = `
            SELECT followId, followerId, followingId, createdAt
            FROM follows
            WHERE followerId = ? AND followingId = ?
        `;
        db.get(sql, [followerId, followingId], (err, row) => {
            if (err) return reject(err);
            resolve(row);
        });
        });
    }
    getFollowersCount(userId) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT COUNT(*) AS count
                FROM follows
                WHERE followingId = ?
            `;
            db.get(sql, [userId], (err, row) => {
                if (err) return reject(err);
                resolve(row.count);
            });
        });
    }
    getFollowingCount(userId) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT COUNT(*) AS count
                FROM follows
                WHERE followerId = ?
            `;
            db.get(sql, [userId], (err, row) => {
                if (err) return reject(err);
                resolve(row.count);
            });
        });
    }
}
module.exports = FollowDao;
