const categoryService = require('../services/categoryService');

const createCategories = async (req, res) => {
  const response = await categoryService.createCategory(req.body);
  try {
    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Erros' });
  }
};

const getCategories = async (_req, res) => {
  try {
    const response = await categoryService.getAllCategories();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Erros' });
  }
};

module.exports = {
  createCategories,
  getCategories,
};