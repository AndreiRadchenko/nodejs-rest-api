const { User } = require('../../models/user');
const { HttpError } = require('../../helpers');

const register = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    throw HttpError(409, 'Email in use');
  }
  const newUser = await User.create(req.body);
  res.status(201).json({
    message: 'new user created',
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = register;
