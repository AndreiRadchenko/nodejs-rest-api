const express = require('express');
const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../controllers/contacts');

const validateBody = require('../../middlewares/validateBody');
const contactSchema = require('../../schemas/contacts');

const router = express.Router();

router.get('/', getContacts);

router.get('/:contactId', getContactById);

router.post('/', validateBody(contactSchema), addContact);

router.delete('/:contactId', removeContact);

router.put('/:contactId', validateBody(contactSchema), updateContact);

module.exports = router;
