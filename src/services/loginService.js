const { User } = require('../database/models');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });
  if (!user || user.password !== password) return ('invalid fields');
};

module.exports = {
  login,
};
