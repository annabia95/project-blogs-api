const { User } = require('../database/models');

const createUser = async ({ displayName, email, password, image }) => {
  const user = await User.findOne({
    where: { displayName, email, password, image },
  });
  if (user) return 'invalid fields';
  const userCreate = await User.create({ displayName, email, password, image });
  return userCreate;
};

const getAllUsers = async () => {
  const user = await User.findAll(
    { attributes: ['id', 'displayName', 'email', 'image'] },
  );
  return user;
};

const getUserById = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: ['id', 'displayName', 'email', 'image'],
  });
  return user;
};

const findUserId = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user.id;
};

const deleteUserId = async (email) => {
    const id = await findUserId(email);
    await User.destroy({ where: { id } });
};


module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUserId,
};
