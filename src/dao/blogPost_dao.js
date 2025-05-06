// src/dao/blogpost_dao.js
const db = require('../config/db');

class BlogPostDao {
  createBlogPost(post) {
    const {
      userId,
      title,
      content,
      country,
      dateOfVisit,
      coverImage = null
    } = post;

    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO blogPosts
          (userId, title, content, country, dateOfVisit, coverImage)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      db.run(
        sql,
        [userId, title, content, country, dateOfVisit, coverImage],
        function(err) {
          if (err) return reject(err);
          db.get(
            `
              SELECT
                bp.blogPostId,
                bp.userId,
                u.firstName || ' ' || u.lastName AS author,
                bp.title,
                bp.content,
                bp.country,
                bp.dateOfVisit,
                bp.coverImage,
                bp.createdAt,
                bp.updatedAt
              FROM blogPosts bp
              JOIN users u ON bp.userId = u.userId
              WHERE bp.blogPostId = ?
            `,
            [this.lastID],
            (err, row) => err ? reject(err) : resolve(row)
          );
        }
      );
    });
  }

  getBlogPostById(blogPostId) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT
          bp.blogPostId,
          bp.userId,
          u.firstName || ' ' || u.lastName AS author,
          bp.title,
          bp.content,
          bp.country,
          bp.dateOfVisit,
          bp.coverImage,
          bp.createdAt,
          bp.updatedAt
        FROM blogPosts bp
        JOIN users u ON bp.userId = u.userId
        WHERE bp.blogPostId = ?
      `;
      db.get(sql, [blogPostId], (err, row) => err ? reject(err) : resolve(row));
    });
  }

  getBlogPostsByUserId(userId) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT
          bp.blogPostId,
          bp.userId,
          u.firstName || ' ' || u.lastName AS author,
          bp.title,
          bp.content,
          bp.country,
          bp.dateOfVisit,
          bp.coverImage,
          bp.createdAt,
          bp.updatedAt
        FROM blogPosts bp
        JOIN users u ON bp.userId = u.userId
        WHERE bp.userId = ?
        ORDER BY bp.createdAt DESC
      `;
      db.all(sql, [userId], (err, rows) => err ? reject(err) : resolve(rows));
    });
  }

  getAllBlogPosts() {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT
          bp.blogPostId,
          bp.userId,
          u.firstName || ' ' || u.lastName AS author,
          bp.title,
          bp.content,
          bp.country,
          bp.dateOfVisit,
          bp.coverImage,
          bp.createdAt,
          bp.updatedAt
        FROM blogPosts bp
        JOIN users u ON bp.userId = u.userId
        ORDER BY bp.createdAt DESC
      `;
      db.all(sql, [], (err, rows) => err ? reject(err) : resolve(rows));
    });
  }
  getAllBlogPostsPaginated(limit, offset) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT
          bp.blogPostId,
          bp.userId,
          u.firstName || ' ' || u.lastName AS author,
          bp.title,
          bp.content,
          bp.country,
          bp.dateOfVisit,
          bp.coverImage,
          bp.createdAt,
          bp.updatedAt
        FROM blogPosts bp
        JOIN users u ON bp.userId = u.userId
        ORDER BY bp.createdAt DESC
        LIMIT ? OFFSET ?
      `;
      db.all(sql, [limit, offset], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }
  countAllBlogPosts() {
    return new Promise((resolve, reject) => {
      db.get(`SELECT COUNT(*) AS count FROM blogPosts`, [], (err, row) => {
        if (err) return reject(err);
        resolve(row.count);
      });
    });
  }

  getBlogPostsByCountry(country) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT
          bp.blogPostId,
          bp.userId,
          u.firstName || ' ' || u.lastName AS author,
          bp.title,
          bp.content,
          bp.country,
          bp.dateOfVisit,
          bp.coverImage,
          bp.createdAt,
          bp.updatedAt
        FROM blogPosts bp
        JOIN users u ON bp.userId = u.userId
        WHERE bp.country = ?
        ORDER BY bp.createdAt DESC
      `;
      db.all(sql, [country], (err, rows) => err ? reject(err) : resolve(rows));
    });
  }

  searchBlogPostsByQuery(query) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT
          bp.blogPostId,
          bp.userId,
          u.firstName || ' ' || u.lastName AS author,
          bp.title,
          bp.content,
          bp.country,
          bp.dateOfVisit,
          bp.coverImage,
          bp.createdAt,
          bp.updatedAt
        FROM blogPosts bp
        JOIN users u ON bp.userId = u.userId
        WHERE bp.country LIKE ?
           OR (u.firstName || ' ' || u.lastName) LIKE ?
        ORDER BY bp.createdAt DESC
      `;
      const like = `%${query}%`;
      db.all(sql, [like, like], (err, rows) => err ? reject(err) : resolve(rows));
    });
  }

  updateBlogPost(post) {
    const { blogPostId, title, content, country, dateOfVisit, coverImage = null } = post;
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE blogPosts
        SET title = ?,
            content = ?,
            country = ?,
            dateOfVisit = ?,
            coverImage = ?,
            updatedAt = CURRENT_TIMESTAMP
        WHERE blogPostId = ?
      `;
      db.run(
        sql,
        [title, content, country, dateOfVisit, coverImage, blogPostId],
        function(err) {
          if (err) return reject(err);
          db.get(
            `
              SELECT
                bp.blogPostId,
                bp.userId,
                u.firstName || ' ' || u.lastName AS author,
                bp.title,
                bp.content,
                bp.country,
                bp.dateOfVisit,
                bp.coverImage,
                bp.createdAt,
                bp.updatedAt
              FROM blogPosts bp
              JOIN users u ON bp.userId = u.userId
              WHERE bp.blogPostId = ?
            `,
            [blogPostId],
            (err, row) => err ? reject(err) : resolve(row)
          );
        }
      );
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
