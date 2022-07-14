const { User } = require('../database/models');

const createUser = async ({ displayName, email, password, image }) => {
  const user = await User.findOne({
    where: { displayName, email, password, image },
  });
  if (user) return 'invalid fields';
  const userCreate = await User.create({ displayName, email, password, image });
  return userCreate;
};

module.exports = {
  createUser,
};
