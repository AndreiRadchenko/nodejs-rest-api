const { Contact } = require('../models/contact');
const HttpError = require('../helpers/HttpError');

const getContactById = async (req, res, next) => {
  const contact = await Contact.findById(req.params.contactId);
  if (!contact) {
    throw HttpError(404, 'Not found');
  }
  res.json({ message: `Contact with Id: ${req.params.contactId}`, contact });
};

module.exports = getContactById;
