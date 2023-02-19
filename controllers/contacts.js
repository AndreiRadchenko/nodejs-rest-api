const model = require('../models/contacts');
const HttpError = require('../helpers/HttpError');
const ctrlWrapper = require('../helpers/ctrlWrapper');

const getContacts = async (req, res, next) => {
  const contacts = await model.listContacts();
  res.json({ message: 'Contacts list array in json format', contacts });
};

const getContactById = async (req, res, next) => {
  const contact = await model.getContactById(req.params.contactId);
  if (!contact) {
    throw HttpError(404, 'Not found');
  }
  res.json({ message: `Contact with Id: ${req.params.contactId}`, contact });
};

const addContact = async (req, res, next) => {
  const newContact = await model.addContact(req.body);
  res.status(201).json({ message: 'new contact added', newContact });
};

const removeContact = async (req, res, next) => {
  const result = await model.removeContact(req.params.contactId);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json({ message: 'contact deleted', result });
};

const updateContact = async (req, res, next) => {
  const result = await model.updateContact(req.params.contactId, req.body);
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
