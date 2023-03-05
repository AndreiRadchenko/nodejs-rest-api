const { Contact } = require('../../models/contact');
const HttpError = require('../../helpers/HttpError');

const removeContact = async (req, res, next) => {
  const { contactId: id } = req.params;
  // const result = await Contact.findByIdAndRemove(req.params.contactId);
  const result = await Contact.findOneAndRemove({ $and: [{ _id: id }, { owner: req.user._id }] });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json({ message: 'contact deleted', result });
};

module.exports = removeContact;
