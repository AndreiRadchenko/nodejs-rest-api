const { Contact } = require('../../models/contact');

const getContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const contacts = await Contact.find({ owner }, '-createdAt -updatedAt');
  res.json({ message: 'Contacts list array in json format', contacts });
};

module.exports = getContacts;
