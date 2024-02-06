import { type InferSchemaType, Schema, model } from 'mongoose'

const todoSchema = new Schema({
    title: {
        type: String,
        require: [true, 'A todo must have a title'],
        trim: true,
        maxlength: [10, 'A todo can only have a max of 10 chars'],
        minlength: [3, 'A todo can only have a min of 3 chars'],
    },
    completed: {
        type: Boolean,
    },
})

type Todo = InferSchemaType<typeof todoSchema>

export default model<Todo>('Todo', todoSchema)
