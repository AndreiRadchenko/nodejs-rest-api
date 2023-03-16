const { User } = require('../../models/user');
const { HttpError, sendEmail, createEmailFromTemplate } = require('../../helpers');
const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, 'Email not found');
  }
  if (user.verify) {
    throw HttpError(400, 'Verification has already been passed');
  }

  const mail = {
    to: email,
    subject: 'Email confirmation',
    html: await createEmailFromTemplate({
      name: user.name,
      confirmationLink: `${BASE_URL}/api/auth/verify/${user.verificationToken}`,
      actionType: 'register',
    }),
  };

  await sendEmail(mail);

  res.json({
    message: 'Verify email send success',
  });
};

module.exports = resendVerifyEmail;
