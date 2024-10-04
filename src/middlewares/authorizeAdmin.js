const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'You must be an admin to perform this action.' });
    }
    next();
  };



module.exports = authorizeAdmin;
