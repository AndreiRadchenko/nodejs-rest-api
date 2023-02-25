const { Contact } = require('../../models/contact');
const HttpError = require('../../helpers/HttpError');

const updateContact = async (req, res, next) => {
  const result = await Contact.findByIdAndUpdate(req.params.contactId, req.body, { new: true });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json({ message: 'contact with new fields', result });
};

module.exports = updateContact;
