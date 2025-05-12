const BlogPostService = require("../services/blogPost_service");


class BlogPostController {
  constructor() {
    this.blogPostService = new BlogPostService();
    this.createBlogPostApi = this.createBlogPostApi.bind(this);
    this.getBlogPostByIdApi = this.getBlogPostByIdApi.bind(this);
    this.getBlogPostsByUserIdApi = this.getBlogPostsByUserIdApi.bind(this);
    this.getAllBlogPostsApi = this.getAllBlogPostsApi.bind(this);
    this.updateBlogPostApi = this.updateBlogPostApi.bind(this);
    this.deleteBlogPostApi = this.deleteBlogPostApi.bind(this);
    this.searchBlogPostsApi = this.searchBlogPostsApi.bind(this);
    this.searchByCountryApi = this.searchByCountryApi.bind(this);
    this.searchByAuthorApi = this.searchByAuthorApi.bind(this);
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
      const userId = Number(req.query.userId);
      const page   = Number(req.query.page)  || 1;
      const size   = Number(req.query.size)  || 10;
      const result = await this.blogPostService.getBlogPostsByUserId_service(userId, page, size);
      res.status(200).json(result);
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
  
  async searchBlogPostsApi(req, res, next) {
    try {
      const { query } = req.query;
      const posts = await this.blogPostService.searchBlogPosts_service(query);
      res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
  }
    async searchByCountryApi(req, res, next) {
    try {
      const { query, page, size } = req.query;
      const result = await this.blogPostService.searchByCountry_service(query, page, size);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async searchByAuthorApi(req, res, next) {
    try {
      const { query, page, size } = req.query;
      const result = await this.blogPostService.searchByAuthor_service(query, page, size);
      res.json(result);
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
