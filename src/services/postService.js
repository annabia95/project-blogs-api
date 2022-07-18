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

const getPostById = async (id) => {
  const user = await BlogPost.findOne({
    where: { id },
    attributes: ['id', 'title', 'content', 'userId', 'published', 'updated'],
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return user;
};

const verifyPosts = async (id, email) => {
  const post = await getPostById(id);
  if (post.user.email !== email.data) return false;
  return true;
};

const updatePost = async ({ title, content, id, email }) => {
   const verify = await verifyPosts(id, email);
  if (verify === false) return 'unauthorized user';

  await BlogPost.update({ title, content }, { where: { id } });

  const postUpdate = await getPostById(id);

  return postUpdate;
};

module.exports = {
  getPosts,
  getPostById,
  updatePost,
};