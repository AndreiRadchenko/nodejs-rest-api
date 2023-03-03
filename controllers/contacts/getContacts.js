const { Contact } = require('../../models/contact');

const getContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;

  const queryObj = { owner, ...req.query };
  const excludedFields = ['page', 'sort', 'limit'];
  excludedFields.forEach(el => delete queryObj[el]);

  const skip = (page - 1) * limit;
  const contacts = await Contact.find(queryObj, '-createdAt -updatedAt', {
    skip,
    limit: Number(limit),
  }).populate('owner', 'name email');
  res.json({ message: 'Contacts list array in json format', contacts });
};

module.exports = getContacts;
