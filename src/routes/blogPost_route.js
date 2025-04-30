const express = require('express');
const blogPostController = require('../controllers/blogPost_controller');
const blogRouter = express.Router();

blogRouter.get('/',(req, res)=>{
    return res.status(200).json({"status":"this is the blog post service"})
})

blogRouter.post('/create', blogPostController.createBlogPostApi);

blogRouter.get('/find/blogPostId', blogPostController.getBlogPostByIdApi);
blogRouter.get('/findall/userId', blogPostController.getBlogPostsByUserIdApi);
blogRouter.get('/findall/country', blogPostController.getBlogPostsByCountryApi);
blogRouter.get('/findall/query', blogPostController.searchBlogPostsApi)
blogRouter.get('/findall', blogPostController.getAllBlogPostsApi);

blogRouter.put('/update', blogPostController.updateBlogPostApi);

blogRouter.delete('/delete', blogPostController.deleteBlogPostApi);

module.exports = blogRouter;
