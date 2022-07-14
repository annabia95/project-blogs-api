const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;
// https://datatracker.ietf.org/doc/html/rfc7519#section-4.1
const jwtConfig = {
    expiresIn: '8d',
    algorithm: 'HS256',
};

const generateJWTToken = (email) => 
    jwt.sign({ data: email }, SECRET, jwtConfig);

module.exports = {
    generateJWTToken,
};