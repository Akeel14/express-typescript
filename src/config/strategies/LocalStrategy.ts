// config/strategies/LocalStrategy.ts

import { Strategy as LocalStrategy } from 'passport-local'
import User from '../../models/userModel' // Adjust the import path as necessary

// Passport local strategy for email and password login
export default new LocalStrategy(
  {
    usernameField: 'email', // Use email as the login identifier
    passwordField: 'password', // Explicitly define the password field
  },
  async (email, password, done) => {
    try {
      // Find the user by email
      const user = await User.findOne({ email }).select('+password')

      if (!user) {
        return done(null, false, { message: 'Incorrect email or password.' })
      }

      // Check if the password is correct
      //@ts-ignore
      const isMatch = await user.correctPassword(password, user.password)

      if (!isMatch) {
        return done(null, false, { message: 'Incorrect email or password.' })
      }

      // Return the user object upon success
      return done(null, user)
    } catch (error) {
      return done(error)
    }
  },
)
