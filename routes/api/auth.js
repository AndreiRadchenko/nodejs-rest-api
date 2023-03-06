const express = require('express');
const {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
  updateAvatar,
} = require('../../controllers');

const { validateBody, authenticate, upload } = require('../../middlewares');
const { joi } = require('../../models/user');

const router = express.Router();

router.post('/register', validateBody(joi.registerSchema), register);
router.post('/login', validateBody(joi.loginSchema), login);
router.post('/logout', authenticate, logout);
router.get('/current', authenticate, getCurrent);
router.patch('/', authenticate, validateBody(joi.updateSubscription), updateSubscription);
router.patch('/avatars', authenticate, upload.single('avatar'), updateAvatar);

module.exports = router;
