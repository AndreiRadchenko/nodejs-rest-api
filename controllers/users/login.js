const { User } = require('../../models/user');
const HttpError = require('../../helpers/HttpError');
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (!user || !user.comparePassword(password)) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
  res.json({
    message: 'Login successful',
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;