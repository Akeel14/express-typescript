import { type InferSchemaType, Schema, model } from 'mongoose'

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'A todo must have a title'],
      trim: true,
      maxlength: [20, 'A todo can only have a max of 20 chars'],
      minlength: [5, 'A todo can have a min of 5 chars'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [50, 'Description can only have a max of 50 chars'],
      minlength: [10, 'Description can have a min of 5 chars'],
    },
    completed: {
      type: Boolean,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
)

type Todo = InferSchemaType<typeof todoSchema>

export default model<Todo>('Todo', todoSchema)
