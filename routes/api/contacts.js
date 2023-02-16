const express = require('express');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require('../../models/contacts');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.json({ message: 'Contacts list array in json format', contacts });
});

router.get('/:contactId', async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (!contact) {
    res.status(404).json({ message: 'Not found' });
    return;
  }
  res.json({ message: `Contacts with Id: ${req.params.contactId}`, contact });
});

router.post('/', async (req, res, next) => {
  const params = Object.keys(req.body);
  const requiredParams = ['name', 'email', 'phone'];
  if (!requiredParams.every(p => params.includes(p))) {
    res.status(400).json({ message: 'missing required name field' });
    return;
  }
  const newContact = await addContact(req.body);
  res.status(201).json({ message: 'new contact added', newContact });
});

router.delete('/:contactId', async (req, res, next) => {
  const result = await removeContact(req.params.contactId);
  if (!result) {
    res.status(404).json({ message: 'Not found' });
    return;
  }
  res.status(200).json({ message: 'contact deleted', result });
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
