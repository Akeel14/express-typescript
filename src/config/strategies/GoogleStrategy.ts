import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import User from '../../models/userModel'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  throw new Error('Google client ID or secret is not set.')
}

const googleStrategy = new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/v1/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails?.[0]?.value ?? null

      if (!email) {
        return done(null, false, {
          message: 'No email found from Google account.',
        })
      }

      let user = await User.findOne({ email: email })

      if (!user) {
        user = await User.create({
          name: profile.displayName,
          email: email,
        })
      }
      done(null, user)
    } catch (error) {
      done(error as Error)
    }
  },
)

export default googleStrategy
