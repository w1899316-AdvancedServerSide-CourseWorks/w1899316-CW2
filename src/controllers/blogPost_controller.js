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
    this.getBlogPostsByCountryApi = this.getBlogPostsByCountryApi.bind(this);
    this.searchBlogPostsApi = this.searchBlogPostsApi.bind(this);
  }

  async createBlogPostApi(req, res, next) {
    try {
      let coverUrl = null;
      if (req.file) {
        coverUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      }

      const dto = {
        ...req.body,
        coverImage: coverUrl
      };

      const post = await this.blogPostService.createBlogPost_service(dto);
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
      const { page = 1, size = 10 } = req.query;
      const data = await this.blogPostService.getAllBlogPosts_service(page, size);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
  async getBlogPostsByCountryApi(req, res, next) {
    try {
      const { country } = req.query;
      const posts = await this.blogPostService.getBlogPostsByCountry_service(country);
      res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
  }
  async searchBlogPostsApi(req, res, next) {
    try {
      const { query } = req.query;
      const posts = await this.blogPostService.searchBlogPosts_service(query);
      res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
  }
  async updateBlogPostApi(req, res, next) {
    try {
      const { blogPostId } = req.query;
      const { title, content, country, dateOfVisit } = req.body;
  
      const dto = {
        blogPostId,
        title,
        content,
        country,
        dateOfVisit
      };
  
      if (req.file) {
        dto.coverImage = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      }
  
      const updated = await this.blogPostService.updateBlogPost_service(dto);
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
