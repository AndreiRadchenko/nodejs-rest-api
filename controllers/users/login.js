const { User } = require('../../models/user');
const { HttpError } = require('../../helpers');
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (!user || !(await user.comparePassword(password))) {
    throw HttpError(401, 'Email or password is wrong');
  }

  if (!user.verify) {
    throw HttpError(401, 'Email not verified');
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    message: 'Login successful',
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    },
  });
};

module.exports = login;
