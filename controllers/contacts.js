const { Contact } = require('../models/contact');
const HttpError = require('../helpers/HttpError');
const ctrlWrapper = require('../helpers/ctrlWrapper');

const getContacts = async (req, res, next) => {
  const contacts = await Contact.find({}, '-createdAt -updatedAt');
  res.json({ message: 'Contacts list array in json format', contacts });
};

const getContactById = async (req, res, next) => {
  const contact = await Contact.findById(req.params.contactId);
  if (!contact) {
    throw HttpError(404, 'Not found');
  }
  res.json({ message: `Contact with Id: ${req.params.contactId}`, contact });
};

const addContact = async (req, res, next) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json({ message: 'new contact added', newContact });
};

const removeContact = async (req, res, next) => {
  const result = await Contact.findByIdAndRemove(req.params.contactId);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json({ message: 'contact deleted', result });
};

const updateContact = async (req, res, next) => {
  const result = await Contact.findByIdAndUpdate(req.params.contactId, req.body, { new: true });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json({ message: 'contact with new fields', result });
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};
