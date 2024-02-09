import passport from 'passport'

import User from '../../models/userModel'
import localStrategy from './LocalStrategy'
import googleStrategy from './GoogleStrategy'

passport.use(localStrategy)
passport.use(googleStrategy)

passport.serializeUser((user: IUser, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (error) {
    done(error)
  }
})
