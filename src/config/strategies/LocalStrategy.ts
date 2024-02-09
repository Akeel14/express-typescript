import { Strategy as LocalStrategy } from 'passport-local'

import User from '../../models/userModel'

const localStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email }).select('+password')

      if (!user) {
        return done(null, false, { message: 'Incorrect email or password.' })
      }

      //@ts-ignore
      const isMatch = await user.correctPassword(password, user.password)

      if (!isMatch) {
        return done(null, false, { message: 'Incorrect email or password.' })
      }

      return done(null, user)
    } catch (error) {
      return done(error)
    }
  },
)

export default localStrategy
