const { User } = require('../../models/user');
const { HttpError, sendEmail, createEmailFromTemplate } = require('../../helpers');
const gravatar = require('gravatar');
const { uid } = require('uid');
const { BASE_URL } = process.env;

const register = async (req, res, next) => {
  const { email: userEmail, name } = req.body;
  const user = await User.findOne({ email: userEmail });
  if (user) {
    throw HttpError(409, 'Email in use');
  }
  const avatarURL = gravatar.url(userEmail, { s: '100', r: 'x', d: 'retro' });
  const verificationToken = uid();
  const newUser = await User.create({ ...req.body, avatarURL, verificationToken });

  const mail = {
    to: userEmail,
    subject: 'Email confirmation',
    html: await createEmailFromTemplate({
      name,
      confirmationLink: `${BASE_URL}/api/auth/verify/${verificationToken}`,
      actionType: 'register',
    }),
  };

  await sendEmail(mail);

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
