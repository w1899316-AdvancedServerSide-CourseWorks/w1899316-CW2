const db = require('../config/db');

class ReactionDao {
    constructor(){}
    createReaction(userId, postId, type) {
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO reactions (userId, postId, type)
                VALUES (?, ?, ?)
            `;
            db.run(sql, [userId, postId, type], function(err) {
                if (err) return reject(err);
                db.get(
                `
                    SELECT reactionId, userId, postId, type, createdAt
                    FROM reactions
                    WHERE reactionId = ?
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

    getReactionById(reactionId) {
        return new Promise((resolve, reject) => {
        const sql = `
            SELECT reactionId, userId, postId, type, createdAt
            FROM reactions
            WHERE reactionId = ?
        `;
        db.get(sql, [reactionId], (err, row) => {
            if (err) return reject(err);
            resolve(row);
        });
        });
    }

    getReactionByUserAndPost(userId, postId) {
        return new Promise((resolve, reject) => {
        const sql = `
            SELECT reactionId, userId, postId, type, createdAt
            FROM reactions
            WHERE userId = ? AND postId = ?
        `;
        db.get(sql, [userId, postId], (err, row) => {
            if (err) return reject(err);
            resolve(row);
        });
        });
    }

    getReactionsByPostId(postId) {
        return new Promise((resolve, reject) => {
        const sql = `
            SELECT reactionId, userId, postId, type, createdAt
            FROM reactions
            WHERE postId = ?
            ORDER BY createdAt DESC
        `;
        db.all(sql, [postId], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
        });
    }

    getReactionsByUserId(userId) {
        return new Promise((resolve, reject) => {
        const sql = `
            SELECT reactionId, userId, postId, type, createdAt
            FROM reactions
            WHERE userId = ?
            ORDER BY createdAt DESC
        `;
        db.all(sql, [userId], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
        });
    }

    countLikes(postId) {
        return new Promise((resolve, reject) => {
        const sql = `
            SELECT COUNT(*) AS count
            FROM reactions
            WHERE postId = ? AND type = 'like'
        `;
        db.get(sql, [postId], (err, row) => {
            if (err) return reject(err);
            resolve(row.count);
        });
        });
    }

    countDislikes(postId) {
        return new Promise((resolve, reject) => {
        const sql = `
            SELECT COUNT(*) AS count
            FROM reactions
            WHERE postId = ? AND type = 'dislike'
        `;
        db.get(sql, [postId], (err, row) => {
            if (err) return reject(err);
            resolve(row.count);
        });
        });
    }

    updateReaction(reactionId, type) {
        return new Promise((resolve, reject) => {
        const sql = `
            UPDATE reactions
            SET type = ?, createdAt = CURRENT_TIMESTAMP
            WHERE reactionId = ?
        `;
        db.run(sql, [type, reactionId], function(err) {
            if (err) return reject(err);
            db.get(
            `
                SELECT reactionId, userId, postId, type, createdAt
                FROM reactions
                WHERE reactionId = ?
            `,
            [reactionId],
            (err, row) => {
                if (err) return reject(err);
                resolve(row);
            }
            );
        });
        });
    }

    deleteReaction(reactionId) {
        return new Promise((resolve, reject) => {
        const sql = `DELETE FROM reactions WHERE reactionId = ?`;
        db.run(sql, [reactionId], function(err) {
            if (err) return reject(err);
            resolve(this.changes);
        });
        });
    }
}
module.exports = ReactionDao;
