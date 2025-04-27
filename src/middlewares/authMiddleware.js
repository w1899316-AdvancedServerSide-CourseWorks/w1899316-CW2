const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

function authenticateTokenCookie(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }
  
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

function getUserFromSession(req) {
  if (req.session && req.session.user) {
    console.log("this is the session", req.session)
    return req.session.user;
  }
  return null;
}

function verifyUserSession(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ message: 'User not logged in' });
  }
  const sessionUserId = String(req.session.user.userId || '');
  const requestUserId = String(
    req.query.userId || req.body.userId || req.params.userId || ''
  );
  if (requestUserId && requestUserId !== sessionUserId) {
    return res.status(403).json({ message: 'You are not authorized to access this resource' });
  }
  req.user = req.session.user;
  next();
}

function verifyAdmin(req, res, next) {
  if (req.session && req.session.user && req.session.user.role) {
    const role = String(req.session.user.role).toLowerCase();
    if (role === 'admin') {
      return next();
    }
  }
  return res.status(403).json({ message: 'forbidden: admins only' });
}


module.exports = { authenticateTokenCookie, getUserFromSession, verifyUserSession, verifyAdmin};
