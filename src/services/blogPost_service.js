
const BlogPostDao = require("../dao/blogPost_dao");
const logger = require("../middlewares/logger/winstonLogger");
const CustomError = require("../utils/errorHandler");

class BlogPostService {
  constructor() {
    this.blogPostDao = new BlogPostDao();
  }

  async createBlogPost_service(post) {
    try {
      return await this.blogPostDao.createBlogPost(post);
    } catch (err) {
      logger.error({
        message: "Error in createBlogPost_service",
        errorMessage: err.message,
        stack: err.stack,
        post
      });
      throw new CustomError(500, "Internal server error");
    }
  }

  async getBlogPostById_service(blogPostId) {
    try {
      const result = await this.blogPostDao.getBlogPostById(blogPostId);
      if (!result) throw new CustomError(404, "Blog post not found");
      return result;
    } catch (err) {
      if (err instanceof CustomError) throw err;
      logger.error({
        message: "Error in getBlogPostById_service",
        errorMessage: err.message,
        stack: err.stack,
        blogPostId
      });
      throw new CustomError(500, "Internal server error");
    }
  }

  async getBlogPostsByUserId_service(userId, page, size) {
    try {
      return await this.dao.getBlogPostsByUserId(userId, page, size);
    } catch (err) {
      logger.error({
        message: "Error in getBlogPostsByUserId_service",
        errorMessage: err.message,
        stack: err.stack,
        userId,
        page,
        size
      });
      throw new CustomError(500, "Internal server error");
    }
  }

  async getAllBlogPosts_service() {
    try {
      return await this.blogPostDao.getAllBlogPosts();
    } catch (err) {
      logger.error({
        message: "Error in getAllBlogPosts_service",
        errorMessage: err.message,
        stack: err.stack
      });
      throw new CustomError(500, "Internal server error");
    }
  }
  async getAllBlogPosts_service(page = 1, size = 10) {
    const limit = parseInt(size, 10);
    const offset = (parseInt(page, 10) - 1) * limit;
    try {
      const [rows, total] = await Promise.all([
        this.blogPostDao.getAllBlogPostsPaginated(limit, offset),
        this.blogPostDao.countAllBlogPosts()
      ]);
      return {
        page: parseInt(page, 10),
        size: limit,
        total,
        totalPages: Math.ceil(total / limit),
        posts: rows
      };
    } catch (err) {
      logger.error({
        message: 'Error in getAllBlogPosts_service',
        errorMessage: err.message,
        stack: err.stack,
        page,
        size
      });
      throw new CustomError(500, 'Internal server error');
    }
  }
  async getBlogPostsByCountry_service(country) {
    try {
      return await this.blogPostDao.getBlogPostsByCountry(country);
    } catch (err) {
      logger.error({
        message: "Error in getBlogPostsByCountry_service",
        errorMessage: err.message,
        stack: err.stack,
        country
      });
      throw new CustomError(500, "Internal server error");
    }
  }
  async searchBlogPosts_service(query) {
    try {
      return await this.blogPostDao.searchBlogPostsByQuery(query);
    } catch (err) {
      logger.error({
        message: "Error in searchBlogPosts_service",
        errorMessage: err.message,
        stack: err.stack,
        query
      });
      throw new CustomError(500, "Internal server error");
    }
  }

  async updateBlogPost_service(post) {
    try {
      const updated = await this.blogPostDao.updateBlogPost(post);
      if (!updated) throw new CustomError(404, "Blog post not found");
      return updated;
    } catch (err) {
      if (err instanceof CustomError) throw err;
      logger.error({
        message: "Error in updateBlogPost_service",
        errorMessage: err.message,
        stack: err.stack,
        post
      });
      throw new CustomError(500, "Internal server error");
    }
  }

  async deleteBlogPost_service(blogPostId) {
    try {
      const changes = await this.blogPostDao.deleteBlogPost(blogPostId);
      if (changes === 0) throw new CustomError(404, "Blog post not found");
    } catch (err) {
      if (err instanceof CustomError) throw err;
      logger.error({
        message: "Error in deleteBlogPost_service",
        errorMessage: err.message,
        stack: err.stack,
        blogPostId
      });
      throw new CustomError(500, "Internal server error");
    }
  }
}

module.exports =  BlogPostService;
