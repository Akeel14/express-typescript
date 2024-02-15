import Joi from 'joi'

export const updateUserSchema = Joi.object({
  name: Joi.string().optional().messages({
    'string.base': 'Name must be a string',
  }),
  email: Joi.string().email().lowercase().optional().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Please provide a valid email',
  }),
}).min(1)
