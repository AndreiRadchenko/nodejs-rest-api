const { Contact } = require('../../models/contact');
const HttpError = require('../../helpers/HttpError');

const getContactById = async (req, res, next) => {
  const { contactId: id } = req.params;
  // const contact = await Contact.findById(req.params.contactId);
  const contact = await Contact.findOne({ $and: [{ _id: id }, { owner: req.user._id }] }, req.body);
  if (!contact) {
    throw HttpError(404, 'Not found');
  }
  res.json({ message: `Contact with Id: ${req.params.contactId}`, contact });
};

module.exports = getContactById;
