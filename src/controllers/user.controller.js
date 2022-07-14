const { generateJWTToken } = require('../utils/JWTToken');

const userService = require('../services/userService');

const createUser = async (req, res) => {
  const { email } = req.body;
  const response = await userService.createUser(req.body);
  if (response === 'invalid fields') {
    return res.status(409).json({ message: 'User already registered' });
  }
  try {
    const token = generateJWTToken(email);
    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Erros' });
  }
};
const getUsers = async (_req, res) => {
  try {
    const response = await userService.getAllUsers();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Erros' });
  }
};

const getUserId = async (req, res) => {
  const { id } = req.params;
  const response = await userService.getUserById(id);
  console.log(response);
  if (!response) {
    return res.status(404).json({ message: 'User does not exist' });
  }
  try {
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Erros' });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserId,
};
