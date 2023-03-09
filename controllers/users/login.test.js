const mongoose = require('mongoose');
const request = require('supertest');
require('dotenv').config();
const gravatar = require('gravatar');

const app = require('../../app');
const { User } = require('../../models/user');

const { MONGO_URL, PORT = 3000 } = process.env;

mongoose.set('strictQuery', true);

describe('test auth routes', () => {
  let server;
  let userTestId;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());

  beforeEach(async () => {
    await mongoose.connect(MONGO_URL);
  });

  afterEach(async () => {
    // mongoose.connection.db.dropCollection(async () => {
    //   return await mongoose.connection.close();
    // });
    await User.findByIdAndRemove(userTestId);
    await mongoose.connection.close();
  }, 3000);

  test('test login route', async () => {
    const newUser = {
      name: 'Bogdan',
      email: 'bogdan@gmail.com',
      password: '123qweASD',
    };

    const avatarURL = gravatar.url(newUser.email, { s: '100', r: 'x', d: 'retro' });
    const user = await User.create({ ...newUser, avatarURL });

    /*
        1. Проверить правильность получаемого ответа на 
        AJAX-запрос документации
        2. Проверить что в базу записался нужный элемент.
        */

    const loginUser = {
      email: 'bogdan@gmail.com',
      password: '123qweASD',
    };

    const response = await request(app).post('/api/auth/login').send(loginUser);
    userTestId = user._id;
    expect(response.statusCode).toBe(200);
    const { body } = response;
    expect(body.token).toBeTruthy();
    const { token } = await User.findById(user._id);
    expect(body.token).toBe(token);
  });
});
