const postService = require('../services/postService');

const getAllPosts = async (_req, res) => {
  try {
    const response = await postService.getPosts();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Erros' });
  }
};

const getPostsId = async (req, res) => {
  const { id } = req.params;
  const response = await postService.getPostById(id);
  if (!response) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  try {
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Erros' });
  }
};

const updatePosts = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const email = req.user;

  if (!title || !content) {
    return res
      .status(400)
      .json({ message: 'Some required fields are missing' });
  }
  const response = await postService.updatePost({ id, title, content, email });

  if (response === 'unauthorized user') {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  try {
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Erros' });
  }
};

const deletePosts = async (req, res) => {
  const { id } = req.params;
  const email = req.user;
  const response = await postService.removePost({ id, email });

  if (response === 'post not founded') {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  if (response === 'unauthorized user') {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  try {
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: 'Internal Erros' });
  }
};

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const email = req.user.data;
  if (!title || !content || !categoryIds) {
    return res
      .status(400)
      .json({ message: 'Some required fields are missing' });
  }
  const response = await postService.createNewPost(
    title,
    content,
    categoryIds,
    email,
  );
  if (response === 'invalid category') {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }

  return res.status(201).json(response);
};

module.exports = {
  getAllPosts,
  getPostsId,
  updatePosts,
  deletePosts,
  createPost,
};
