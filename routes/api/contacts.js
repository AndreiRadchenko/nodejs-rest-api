const express = require('express');
const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../controllers');
const { isValidId } = require('../../middlewares');

const validateBody = require('../../middlewares/validateBody');
const { joi } = require('../../models/contact');

const router = express.Router();

router.get('/', getContacts);

router.get('/:contactId', isValidId, getContactById);

router.post('/', validateBody(joi.addSchema), addContact);

router.delete('/:contactId', isValidId, removeContact);

router.put('/:contactId', isValidId, validateBody(joi.addSchema), updateContact);

router.patch('/:contactId/favorite', isValidId, validateBody(joi.toggleFavorite), updateContact);

module.exports = router;
