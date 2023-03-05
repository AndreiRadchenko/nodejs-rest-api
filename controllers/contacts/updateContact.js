const { Contact } = require('../../models/contact');
const HttpError = require('../../helpers/HttpError');

const updateContact = async (req, res, next) => {
  const { contactId: id } = req.params;
  const result = await Contact.findOneAndUpdate(
    { $and: [{ _id: id }, { owner: req.user._id }] },
    req.body,
    { new: true }
  );
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json({ message: 'contact with new fields', result });
};

module.exports = updateContact;
