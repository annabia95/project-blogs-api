const express = require('express');
const { generateJWTToken } = require('../utils/JWTToken');

const loginRouter = express.Router();
const loginService = require('../services/loginService');

loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  
  const response = await loginService.login(email, password);
  
  if (response === 'missing fields') {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  
  if (response === 'invalid fields') {
    return res.status(400).json({ message: 'Invalid fields' });
  }
  
  const token = generateJWTToken(email);
  return res.status(200).json({ token });
});

module.exports = loginRouter;
