const { Contact } = require('../../models/contact');

const addContact = async (req, res, next) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json({ message: 'new contact added', newContact });
};

module.exports = addContact;
