const express = require('express');

const router = express.Router();

const loginController = require('./controllers/login.controller');
const userController = require('./controllers/user.controller');
const categoryController = require('./controllers/category.controller');

const { validateLogin } = require('./middlewares/validateLogin');
const { validateToken } = require('./middlewares/validateToken');
const { validateUser } = require('./middlewares/validateUser');
const { validateCategory } = require('./middlewares/validateCategory');

router.post('/login', validateLogin, loginController);
router.post('/user', validateUser, userController.createUser);
router.get('/user/:id', validateToken, userController.getUserId);
router.get('/user', validateToken, userController.getUsers);
router.post('/categories', validateToken, validateCategory, categoryController.createCategories);

module.exports = router;