const db = require('../config/db');

class UserDao {
    constructor(){}

  createUser(user) {
    const { firstName, lastName, email, password } = user;
    const sql = `
      INSERT INTO users (firstName, lastName, email, password)
      VALUES (?, ?, ?, ?)
    `;
    return new Promise((resolve, reject) => {
      db.run(sql, [firstName, lastName, email, password], function(err) {
        if (err) return reject(err);
        db.get(
          `
            SELECT userId,
                   firstName,
                   lastName,
                   email,
                   createdAt,
                   updatedAt
            FROM users
            WHERE userId = ?
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

  getUserByUserId(userId) {
    const sql = `
      SELECT * FROM users
      WHERE userId = ?
    `;
    return new Promise((resolve, reject) => {
      db.get(sql, [userId], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  }

  getUserByEmail(email) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT * FROM users
        WHERE email = ?
      `;
      db.get(sql, [email], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  }

  getAllUsers() {
    const sql = `
      SELECT * FROM users
      ORDER BY userId
    `;
    return new Promise((resolve, reject) => {
      db.all(sql, [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  updateUser(user) {
    const { userId, firstName, lastName, email, password } = user;
    const sql = `
      UPDATE users
      SET firstName = ?,
          lastName  = ?,
          email     = ?,
          password  = ?,
          updatedAt = CURRENT_TIMESTAMP
      WHERE userId = ?
    `;
    return new Promise((resolve, reject) => {
      db.run(
        sql,
        [firstName, lastName, email, password, userId],
        function(err) {
          if (err) return reject(err);
          db.get(
            `
              SELECT userId,
                     firstName,
                     lastName,
                     email,
                     createdAt,
                     updatedAt
              FROM users
              WHERE userId = ?
            `,
            [userId],
            (err, row) => {
              if (err) return reject(err);
              resolve(row);
            }
          );
        }
      );
    });
  }

  deleteUser(userId) {
    const sql = `DELETE FROM users WHERE userId = ?`;
    return new Promise((resolve, reject) => {
      db.run(sql, [userId], function(err) {
        if (err) return reject(err);
        resolve(this.changes);
      });
    });
  }
}

module.exports =  UserDao;
