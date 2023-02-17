const express = require('express');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');

const router = express.Router();

const requiredParams = ['name', 'email', 'phone'];

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
  const params = Object.keys(req.body);
  if (params.length === 0) {
    res.status(400).json({ message: 'missing fields' });
    return;
  }
  if (!params.every(p => requiredParams.includes(p))) {
    res.status(400).json({ message: 'wrong field name!' });
    return;
  }
  const result = await updateContact(req.params.contactId, req.body);
  if (!result) {
    res.status(404).json({ message: 'Not found' });
    return;
  }
  res.json({ message: 'contact with new fields', result });
});

module.exports = router;
