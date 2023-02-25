const { Contact } = require('../models/contact');

const getContacts = async (req, res, next) => {
  const contacts = await Contact.find({}, '-createdAt -updatedAt');
  res.json({ message: 'Contacts list array in json format', contacts });
};

module.exports = getContacts;
