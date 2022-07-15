const { Category } = require('../database/models');

const createCategory = async ({ name }) => {
  const categoryCreate = await Category.create({ name });
  return categoryCreate;
};

module.exports = {
  createCategory,
};