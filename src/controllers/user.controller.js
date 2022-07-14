const express = require('express');
const { generateJWTToken } = require('../utils/JWTToken');

const userRouter = express.Router();
const userService = require('../services/userService');

userRouter.post('/', async (req, res) => {
  const { email } = req.body;
  const response = await userService.createUser(req.body);
  if (response === 'invalid fields') {
    return res.status(409).json({ message: 'User already registered' });
  }

  const token = generateJWTToken(email);
  return res.status(201).json({ token });
});

module.exports = userRouter;
