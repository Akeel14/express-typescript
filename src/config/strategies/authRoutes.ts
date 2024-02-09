import passport from 'passport'
import { AppRouter } from '../../singletons/AppRouter'

const router = AppRouter.getInstance()

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
)

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/')
  },
)

export default router
