const express = require('express');
const { register, login } = require('../../controllers');

const validateBody = require('../../middlewares/validateBody');
const { joi } = require('../../models/user');

const router = express.Router();

router.post('/register', validateBody(joi.registerSchema), register);
router.post('/login', validateBody(joi.loginSchema), login);

module.exports = router;
