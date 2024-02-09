interface IUser {
  id?: string
  name?: string
  email?: string
  role?: 'user' | 'admin'
  password?: string
  passwordConfirm?: string
}
