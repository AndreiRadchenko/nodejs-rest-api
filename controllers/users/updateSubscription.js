const { User } = require('../../models/user');

const updateSubscription = async (req, res) => {
  const { _id: id } = req.user;
  const { subscription: newSubscription } = req.body;
  const result = await User.findByIdAndUpdate(id, { subscription: newSubscription }, { new: true });
  res.json({
    message: `Subscription set to '${result.subscription}'`,
    user: { name: result.name, email: result.email, subscription: result.subscription },
  });
};

module.exports = updateSubscription;
