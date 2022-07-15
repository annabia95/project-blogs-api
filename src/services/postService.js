const { User, Category, BlogPost } = require('../database/models');

const getPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return posts; 
};

module.exports = {
  getPosts,
};