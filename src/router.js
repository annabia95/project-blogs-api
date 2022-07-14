const express = require('express');

const router = express.Router();

const loginController = require('./controllers/login.controller');

router.use('/login', loginController);

module.exports = router;