const authorizeTrainee = (req, res, next) => {
    if (req.user.role !== 'Trainee') {
      return res.status(403).json({ success: false, message: 'You must be an Trainee to perform this action.' });
    }
    next();
  };



module.exports = authorizeTrainee;
