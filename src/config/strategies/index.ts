import passport from 'passport'

import User from '../../models/userModel'
import localStrategy from './LocalStrategy'

passport.use(localStrategy)

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
