const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET; 

function generateToken(user) {

  const payload = { userId: user.userId, email: user.email };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

function verifyToken(token) {
  return jwt.verify(token, secretKey);
}

module.exports = { generateToken, verifyToken };

