const express = require('express');

const router = express.Router();

const loginController = require('./controllers/login.controller');
const userController = require('./controllers/user.controller');

const { validateLogin } = require('./middlewares/validateLogin');
const { validateToken } = require('./middlewares/validateToken');
const { validateUser } = require('./middlewares/validateUser');

router.post('/login', validateLogin, loginController);
router.post('/user', validateUser, userController.createUser);
router.get('/user', validateToken, userController.getUsers);

module.exports = router;