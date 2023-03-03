const { Contact } = require('../../models/contact');

const addContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });
  res.status(201).json({ message: 'new contact added', newContact });
};

module.exports = addContact;
