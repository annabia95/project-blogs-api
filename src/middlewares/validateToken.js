const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const user = jwt.verify(token, SECRET);
    req.user = user;
    next();
  } catch (e) {
    console.log('error', e.message);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { 
  validateToken,
};
