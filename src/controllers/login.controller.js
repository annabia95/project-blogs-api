const { generateJWTToken } = require('../utils/JWTToken');

const loginService = require('../services/loginService');

const login = async (req, res) => {
  const { email, password } = req.body;
  
  const response = await loginService.login(email, password);
  
  if (response === 'invalid fields') {
    return res.status(400).json({ message: 'Invalid fields' });
  }
  try {
  const token = generateJWTToken(email);
  return res.status(200).json({ token });
} catch (error) {
  return res.status(500).json({ message: 'Internal Errors' });
}
};

module.exports = login;
