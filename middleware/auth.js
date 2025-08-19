const { verifyToken } = require('../config/jwt');
const User = require('../models/user');

const protect = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = verifyToken(token);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ error: 'Not authorized, token failed' });
    }
  }
  
  if (!token) {
    res.status(401).json({ error: 'Not authorized, no token' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Admin access required' });
  }
};

const internOnly = (req, res, next) => {
  if (req.user && req.user.role === 'intern') {
    next();
  } else {
    res.status(403).json({ error: 'Intern access required' });
  }
};

module.exports = { protect, adminOnly, internOnly };