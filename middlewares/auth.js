const resError = require("../tools/resError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.fetchUser = async (req, res, next) => {
  const authToken = req.cookies.kToken;
  if (!authToken) {
    return resError(401, "Unauthorized", res);
  }

  const data = jwt.verify(authToken, process.env.JWT_SECRET);

  req.user = await User.findById(data.user.id);

  next();
};

exports.authRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return resError(
        403,
        `${req.user.role} not allowed to access this resource`,
        res
      );
    }
    next();
  };
};
