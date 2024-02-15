import Joi from 'joi'

export const createTodoSchema = Joi.object({
  title: Joi.string().required().trim().max(20).min(5).messages({
    'string.base': 'Title must be a string',
    'string.empty': 'Title cannot be empty',
    'string.max': 'Title can only have a max of 20 characters',
    'string.min': 'Title must have at least 5 characters',
  }),
  description: Joi.string().required().trim().max(50).min(10).messages({
    'string.base': 'Description must be a string',
    'string.empty': 'Description cannot be empty',
    'string.max': 'Description can only have a max of 50 characters',
    'string.min': 'Description must have at least 10 characters',
  }),
  completed: Joi.boolean().messages({
    'boolean.base': 'Completed must be a boolean',
  }),
})

export const updateTodoSchema = Joi.object({
  title: Joi.string().trim().max(20).min(5).messages({
    'string.base': 'Title must be a string',
    'string.max': 'Title can only have a max of 20 characters',
    'string.min': 'Title must have at least 5 characters',
  }),
  description: Joi.string().trim().max(50).min(10).messages({
    'string.base': 'Description must be a string',
    'string.max': 'Description can only have a max of 50 characters',
    'string.min': 'Description must have at least 10 characters',
  }),
  completed: Joi.boolean().messages({
    'boolean.base': 'Completed must be a boolean',
  }),
}).min(1) // Ensure that at least one field is provided for update

export const idSchema = Joi.object({
  id: Joi.string().length(24).hex().required().messages({
    'string.length': 'ID must be 24 hexadecimal characters',
    'string.hex': 'ID must be a valid hexadecimal string',
  }),
})
