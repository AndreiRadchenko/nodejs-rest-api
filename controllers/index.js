const getContacts = require('./contacts/getContacts');
const getContactById = require('./contacts/getContactById');
const addContact = require('./contacts/addContact');
const removeContact = require('./contacts/removeContact');
const updateContact = require('./contacts/updateContact');

const register = require('./users/register');
const login = require('./users/login');
const logout = require('./users/logout');
const getCurrent = require('./users/getCurrent');
const updateSubscription = require('./users/updateSubscription');

const ctrlWrapper = require('../helpers/ctrlWrapper');

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),

  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  updateSubscription: ctrlWrapper(updateSubscription),
};
