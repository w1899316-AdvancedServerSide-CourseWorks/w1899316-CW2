const express = require('express');
const path    = require('path');
const multer  = require('multer');
const blogPostController = require('../controllers/blogPost_controller');
const { authenticateTokenCookie } = require('../middlewares/authMiddleware');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  }
});
const upload = multer({ storage });

const blogRouter = express.Router();

blogRouter.get('/', (req, res) => {
  res.status(200).json({ status: 'this is the blog post service' });
});

blogRouter.post('/create', upload.single('coverImage'), authenticateTokenCookie, blogPostController.createBlogPostApi);
blogRouter.get('/find/blogPostId', blogPostController.getBlogPostByIdApi);
blogRouter.get('/findall/userId', blogPostController.getBlogPostsByUserIdApi);
blogRouter.get('/findall/country', blogPostController.searchByCountryApi);
blogRouter.get('/findall/author', blogPostController.searchByAuthorApi);
blogRouter.get('/findall/query', blogPostController.searchBlogPostsApi);
blogRouter.get('/findall', blogPostController.getAllBlogPostsApi);
blogRouter.put('/update', upload.single('coverImage'), authenticateTokenCookie,blogPostController.updateBlogPostApi);
blogRouter.delete('/delete', blogPostController.deleteBlogPostApi);

module.exports = blogRouter;
