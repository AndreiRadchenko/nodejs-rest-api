const { Contact } = require('../models/contact');
const HttpError = require('../helpers/HttpError');

const removeContact = async (req, res, next) => {
  const result = await Contact.findByIdAndRemove(req.params.contactId);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json({ message: 'contact deleted', result });
};

module.exports = removeContact;
