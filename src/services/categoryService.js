const { Category } = require('../database/models');

const createCategory = async ({ name }) => {
  const categoryCreate = await Category.create({ name });
  return categoryCreate;
};

const getAllCategories = async () => {
  const categories = await Category.findAll(
    { attributes: ['id', 'name'] },
  );
  return categories;
};

module.exports = {
  createCategory,
  getAllCategories,
};