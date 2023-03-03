const { User } = require('../../models/user');

const logout = async (req, res, next) => {
  const { _id: id } = req.user;
  await User.findByIdAndUpdate(id, { token: '' });
  console.log('logout success');
  res.status(204).send();
};

module.exports = logout;
