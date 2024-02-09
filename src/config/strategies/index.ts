import passport from 'passport'
import localStrategy from './LocalStrategy'
import User from '../../models/userModel'

// Use the configured local strategy for authentication
passport.use(localStrategy)

// Serialize user to decide which data of the user object should be stored in the session
passport.serializeUser((user: IUser, done) => {
  done(null, user.id) // The user ID is saved in the session and is later used to retrieve the whole object via the deserializeUser function.
})

// Deserialize user from the session data
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (error) {
    done(error)
  }
})
