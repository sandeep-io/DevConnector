const mongoose = require('mongoose');

module.exports = function (param) {
  return (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params[param])) {
      return res.status(400).json({ msg: 'Invalid ObjectId' });
    }
    next();
  };
};
