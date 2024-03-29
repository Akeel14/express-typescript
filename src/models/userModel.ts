import bcrypt from 'bcryptjs'
import validator from 'validator'
import { type InferSchemaType, Schema, model } from 'mongoose'

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name!'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    password: {
      type: String,
      select: false,
    },
    passwordConfirm: {
      type: String,
      validate: {
        validator: function (this: IUser, inputValue: string) {
          return inputValue === this.password
        },
        message: 'Passwords are not the same!',
      },
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
)

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string,
) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next()

  this.password = await bcrypt.hash(this.password, 12)
  // @ts-ignore
  this.passwordConfirm = undefined
  next()
})

type User = InferSchemaType<typeof userSchema>

export default model<User>('User', userSchema)
