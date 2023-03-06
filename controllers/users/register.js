const { User } = require('../../models/user');
const { HttpError } = require('../../helpers');
const gravatar = require('gravatar');

const register = async (req, res, next) => {
  const { email: userEmail } = req.body;
  const user = await User.findOne({ email: userEmail });
  if (user) {
    throw HttpError(409, 'Email in use');
  }
  const avatarURL = gravatar.url(userEmail, { s: '100', r: 'x', d: 'retro' });
  const newUser = await User.create({ ...req.body, avatarURL });
  res.status(201).json({
    message: 'new user created',
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};

module.exports = register;
