require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');

const { MONGO_URL, PORT = 3000 } = process.env;

mongoose.set('strictQuery', true);

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log('Database connection successful');
      console.log('Server running. Use our API on port: 3000');
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
