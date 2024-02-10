import passport from 'passport'
import { AppRouter } from '../../singletons/AppRouter'

const router = AppRouter.getInstance()

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
)

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: '/login/failed',
  }),
)
router.get('/login/failed', (req, res) => {
  res.status(401).json({
    error: true,
    message: 'Log in failure',
  })
})

router.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: 'Successfully Logged In',
      user: req.user,
    })
  } else {
    res.status(403).json({ error: true, message: 'Not Authorized' })
  }
})

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send('Failed to log out')
    }
    res.redirect(`${process.env.CLIENT_URL}/login`)
  })
})

export default router
