const {
  User,
  Category,
  BlogPost,
  PostCategory,
} = require('../database/models');

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
  const posts = await BlogPost.findOne({
    where: { id },
    attributes: ['id', 'title', 'content', 'userId', 'published', 'updated'],
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return posts;
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

const removePost = async ({ id, email }) => {
  const post = await BlogPost.findOne({ where: { id } });
  if (!post) return 'post not founded';
  const verify = await verifyPosts(id, email);
  if (verify === false) return 'unauthorized user';
  const removedPost = await BlogPost.destroy({
    where: { id },
  });
  return removedPost;
};

const validateCategoryIds = async (categoryIds) => {
  const getAllCategories = await Category.findAll();

  const chekIds = categoryIds.every((id) =>
    getAllCategories.some((element) => id === element.dataValues.id));

  return chekIds;
};

const findUserId = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user.id;
};

const createNewPost = async (title, content, categoryIds, email) => {
  const validCategoryIds = await validateCategoryIds(categoryIds);
  if (!validCategoryIds) return 'invalid category';

  const dateTime = new Date();
  const userId = await findUserId(email);
  const createNewBlog = await BlogPost.create({
    title,
    content,
    userId,
    published: dateTime,
    updated: dateTime,
  });

  const postId = createNewBlog.id;
  categoryIds.forEach((categoryId) =>
    PostCategory.create({ postId, categoryId }));

  const response = await BlogPost.findByPk(postId);
  return response;
};

const searchPost = async (q) => {
  if (q === '') {
    const getAllPosts = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: 'password' } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    return getAllPosts;
  }
  const search = await BlogPost.findAll({
    where: {
      [Op.or]: [{ title: { [Op.like]: `%${q}%` } }, { content: { [Op.like]: `%${q}%` } }] },
    include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!search) return [];
  return search;
};

module.exports = {
  getPosts,
  getPostById,
  updatePost,
  removePost,
  createNewPost,
  searchPost,
};
