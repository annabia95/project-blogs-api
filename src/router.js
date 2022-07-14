const express = require('express');

const router = express.Router();

const loginController = require('./controllers/login.controller');
const userController = require('./controllers/user.controller');

const { validateUser } = require('./middlewares/validateUser');

router.use('/login', loginController);
router.use('/user', validateUser, userController);

module.exports = router;