const isConflict = ({ name, code }) => {
  //   console.log('name:', name, 'code:', code);
  return name === 'MongoServerError' && code === 11000;
};

const handleSchemaError = (error, data, next) => {
  error.status = isConflict(error) ? 409 : 400;
  next();
};

module.exports = handleSchemaError;
