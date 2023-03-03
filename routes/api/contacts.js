const express = require('express');
const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../controllers');
const { isValidId, authenticate } = require('../../middlewares');

const validateBody = require('../../middlewares/validateBody');
const { joi } = require('../../models/contact');

const router = express.Router();

router.get('/', authenticate, getContacts);

router.get('/:contactId', authenticate, isValidId, getContactById);

router.post('/', authenticate, validateBody(joi.addSchema), addContact);

router.delete('/:contactId', authenticate, isValidId, removeContact);

router.put('/:contactId', authenticate, isValidId, validateBody(joi.addSchema), updateContact);

router.patch(
  '/:contactId/favorite',
  authenticate,
  isValidId,
  validateBody(joi.toggleFavorite),
  updateContact
);

module.exports = router;
