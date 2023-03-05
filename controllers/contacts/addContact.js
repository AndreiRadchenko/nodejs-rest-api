const { Contact } = require('../../models/contact');
const { HttpError } = require('../../helpers');

const addContact = async (req, res, next) => {
  const { _id: owner } = req.user;

  const contactExists = await Contact.findOne({
    $and: [{ owner: req.user._id }, { $or: [{ email: req.body.email }, { name: req.body.name }] }],
  });
  if (contactExists) {
    throw HttpError(409, 'Contact with this name or email already exists');
  }

  const newContact = await Contact.create({ ...req.body, owner });
  res.status(201).json({ message: 'new contact added', newContact });
};

module.exports = addContact;
