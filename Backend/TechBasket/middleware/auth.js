// middleware/auth.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = "a3d94fbe9837b2256e0c7eaeb512fc937dd2a6d4d2cc5ff748bbcd82d9f97e71" // or from process.env

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required: token missing' });
  }
  const token = authHeader.split(' ')[1];
  try {
    // payload should include _id (user id) and possibly email/role
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { _id: decoded._id, email: decoded.email, role: decoded.role || 'customer' };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticateUser;
