import Joi from 'joi'

export const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Please tell us your name!',
    'any.required': 'Name is a required field',
  }),
  email: Joi.string().email().required().lowercase().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Please provide a valid email',
    'string.lowercase': 'Email must be in lowercase',
    'string.empty': 'Please provide your email',
    'any.required': 'Email is a required field',
  }),
  role: Joi.string().valid('user', 'admin').default('user').messages({
    'string.base': 'Role must be a string',
    'any.only': 'Role must be either user or admin',
  }),
  password: Joi.string().required().messages({
    'string.base': 'Password must be a string',
    'string.empty': 'Please provide a password',
    'any.required': 'Password is a required field',
  }),
  passwordConfirm: Joi.any().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords are not the same!',
    'any.required': 'Password confirm is a required field',
  }),
}).with('password', 'passwordConfirm') // Ensure passwordConfirm matches password

export const loginSchema = Joi.object({
  email: Joi.string().email().required().lowercase().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Please provide a valid email',
    'string.empty': 'Please provide your email',
    'any.required': 'Email is a required field',
  }),
  password: Joi.string().required().messages({
    'string.base': 'Password must be a string',
    'string.empty': 'Please provide a password',
    'any.required': 'Password is a required field',
  }),
})
