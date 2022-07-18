const express = require('express');

const router = express.Router();

const loginController = require('./controllers/login.controller');
const userController = require('./controllers/user.controller');
const categoryController = require('./controllers/category.controller');
const postsController = require('./controllers/posts.controller');

const { validateLogin } = require('./middlewares/validateLogin');
const { validateToken } = require('./middlewares/validateToken');
const { validateUser } = require('./middlewares/validateUser');
const { validateCategory } = require('./middlewares/validateCategory');

router.post('/login', validateLogin, loginController);
router.post('/user', validateUser, userController.createUser);
router.get('/user/:id', validateToken, userController.getUserId);
router.get('/user', validateToken, userController.getUsers);
router.get('/post', validateToken, postsController.getAllPosts);
router.get('/post/:id', validateToken, postsController.getPostsId);
router.post('/post', validateToken, postsController.createPost);
router.put('/post/:id', validateToken, postsController.updatePosts);
router.delete('/post/:id', validateToken, postsController.deletePosts);
router.post('/categories', validateToken, validateCategory, categoryController.createCategories);
router.get('/categories', validateToken, categoryController.getCategories);

module.exports = router;