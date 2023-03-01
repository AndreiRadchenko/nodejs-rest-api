const bcrypt = require('bcrypt');

module.exports = async function () {
  if (this.isNew || this.isModified) {
    this.password = await bcrypt.hash(this.password, 10);
  }
};
