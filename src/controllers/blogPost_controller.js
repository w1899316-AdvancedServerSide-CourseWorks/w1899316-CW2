const BlogPostService = require("../services/blogPost_service");


class BlogPostController {
  constructor() {
    this.blogPostService                = new BlogPostService();
    this.createBlogPostApi              = this.createBlogPostApi.bind(this);
    this.getBlogPostByIdApi             = this.getBlogPostByIdApi.bind(this);
    this.getBlogPostsByUserIdApi        = this.getBlogPostsByUserIdApi.bind(this);
    this.getAllBlogPostsApi             = this.getAllBlogPostsApi.bind(this);
    this.updateBlogPostApi              = this.updateBlogPostApi.bind(this);
    this.deleteBlogPostApi              = this.deleteBlogPostApi.bind(this);
  }

  async createBlogPostApi(req, res, next) {
    try {
      const post = await this.blogPostService.createBlogPost_service(req.body);
      res.status(201).json(post);
    } catch (err) {
      next(err);
    }
  }

  async getBlogPostByIdApi(req, res, next) {
    try {
      const { blogPostId } = req.query;
      const post = await this.blogPostService.getBlogPostById_service(blogPostId);
      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  }

  async getBlogPostsByUserIdApi(req, res, next) {
    try {
      const { userId } = req.query;
      const posts = await this.blogPostService.getBlogPostsByUserId_service(userId);
      res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
  }

  async getAllBlogPostsApi(req, res, next) {
    try {
      const posts = await this.blogPostService.getAllBlogPosts_service();
      res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
  }

  async updateBlogPostApi(req, res, next) {
    try {
      const { blogPostId } = req.query;
      const post = { blogPostId, ...req.body };
      const updated = await this.blogPostService.updateBlogPost_service(post);
      res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  }

  async deleteBlogPostApi(req, res, next) {
    try {
      const { blogPostId } = req.query;
      await this.blogPostService.deleteBlogPost_service(blogPostId);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new BlogPostController();
