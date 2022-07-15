const categoryService = require('../services/categoryService');

const createCategories = async (req, res) => {
  const response = await categoryService.createCategory(req.body);
  try {
    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Erros' });
  }
};

module.exports = {
  createCategories,
};