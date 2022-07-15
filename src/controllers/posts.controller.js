const postService = require('../services/postService');

const getAllPosts = async (_req, res) => {
  try {
    const response = await postService.getPosts();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Erros' });
  }
};

module.exports = {
  getAllPosts,
};