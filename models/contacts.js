const path = require('path');
const fs = require('fs').promises;
const { uid } = require('uid');

const contactsPath = path.join(__dirname, 'contacts.json');

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(contacts);
  } catch (error) {
    console.error('\x1B[31m Error occurs while contacts list was obtained!');
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(e => e.id === contactId);
    return contact;
  } catch (error) {
    console.error('\x1B[31m Error while getting contact!');
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (error) {
    console.error('\x1B[31m Error while deleting contact!');
  }
}

async function addContact({ name, email, phone }) {
  const newContact = {
    id: uid(),
    name,
    email,
    phone,
  };
  try {
    const contacts = await listContacts();
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error('\x1B[31m Error while adding contact!');
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
