const db = require('../config/db');
class BlogPostDao {
  createBlogPost(post) {
    const { userId, title, content, country, dateOfVisit } = post;
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO blogPosts (userId, title, content, country, dateOfVisit)
        VALUES (?, ?, ?, ?, ?)
      `;
      db.run(sql, [userId, title, content, country, dateOfVisit], function(err) {
        if (err) return reject(err);
        db.get(
          `
            SELECT blogPostId, userId, title, content, country, dateOfVisit, createdAt, updatedAt
            FROM blogPosts
            WHERE blogPostId = ?
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
  getBlogPostById(blogPostId) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT blogPostId, userId, title, content, country, dateOfVisit, createdAt, updatedAt
        FROM blogPosts
        WHERE blogPostId = ?
      `;
      db.get(sql, [blogPostId], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  }
  getBlogPostsByUserId(userId) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT blogPostId, userId, title, content, country, dateOfVisit, createdAt, updatedAt
        FROM blogPosts
        WHERE userId = ?
        ORDER BY createdAt DESC
      `;
      db.all(sql, [userId], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }
  getAllBlogPosts() {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT blogPostId, userId, title, content, country, dateOfVisit, createdAt, updatedAt
        FROM blogPosts
        ORDER BY createdAt DESC
      `;
      db.all(sql, [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }
  getBlogPostsByCountry(country) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT blogPostId, userId, title, content, country, dateOfVisit, createdAt, updatedAt
        FROM blogPosts
        WHERE country = ?
        ORDER BY createdAt DESC
      `;
      db.all(sql, [country], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }
  searchBlogPostsByQuery(query) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT bp.blogPostId,
               bp.userId,
               u.firstName,
               u.lastName,
               bp.title,
               bp.content,
               bp.country,
               bp.dateOfVisit,
               bp.createdAt,
               bp.updatedAt
        FROM blogPosts bp
        JOIN users u ON bp.userId = u.userId
        WHERE bp.country LIKE ?
           OR (u.firstName || ' ' || u.lastName) LIKE ?
        ORDER BY bp.createdAt DESC
      `;
      const like = `%${query}%`;
      db.all(sql, [like, like], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }
  updateBlogPost(post) {
    const { blogPostId, title, content, country, dateOfVisit } = post;
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE blogPosts
        SET title = ?, content = ?, country = ?, dateOfVisit = ?, updatedAt = CURRENT_TIMESTAMP
        WHERE blogPostId = ?
      `;
      db.run(sql, [title, content, country, dateOfVisit, blogPostId], function(err) {
        if (err) return reject(err);
        db.get(
          `
            SELECT blogPostId, userId, title, content, country, dateOfVisit, createdAt, updatedAt
            FROM blogPosts
            WHERE blogPostId = ?
          `,
          [blogPostId],
          (err, row) => {
            if (err) return reject(err);
            resolve(row);
          }
        );
      });
    });
  }
  deleteBlogPost(blogPostId) {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM blogPosts WHERE blogPostId = ?`;
      db.run(sql, [blogPostId], function(err) {
        if (err) return reject(err);
        resolve(this.changes);
      });
    });
  }
}
module.exports = BlogPostDao;
