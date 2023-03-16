const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleSchemaError, hashPassword } = require('../helpers');
const bcrypt = require('bcrypt');

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const emailErrorMessage = "Email format doesn't match";

const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,32}$/;
const passwordErrorMessage =
  'Your password must be at least 6 characters long, contain at least one number and have a mixture of uppercase and lowercase letters.';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set username'],
    },
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: String,
    avatarURL: { type: String, required: true },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre('save', hashPassword);

userSchema.post('save', handleSchemaError);

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': `Name cannot be empty`,
    'any.required': `Name is required`,
  }),
  email: Joi.string().pattern(emailRegex).required().messages({
    'string.pattern.base': emailErrorMessage,
    'string.empty': `Email cannot be empty`,
    'any.required': `Email is required`,
  }),
  password: Joi.string().pattern(passwordRegex).required().messages({
    'string.pattern.base': passwordErrorMessage,
    'string.empty': `Password cannot be empty`,
    'any.required': `Password is required`,
  }),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages({
    'string.pattern.base': emailErrorMessage,
    'string.empty': `Email cannot be empty`,
    'any.required': `"Missing required field email"`,
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages({
    'string.pattern.base': emailErrorMessage,
    'string.empty': `Email cannot be empty`,
    'any.required': `Email is required`,
  }),
  password: Joi.string().pattern(passwordRegex).required().messages({
    'string.pattern.base': passwordErrorMessage,
    'string.empty': `Password cannot be empty`,
    'any.required': `Password is required`,
  }),
});

const updateSubscription = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required().messages({
    'any.required': `Subscription is required`,
  }),
});

const User = model('user', userSchema);

module.exports = {
  joi: {
    registerSchema,
    emailSchema,
    loginSchema,
    updateSubscription,
  },
  User,
  userSchema,
};
