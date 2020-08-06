import {createContext} from 'react'

export const AuthContext = createContext({
  isAuth: false,
  name: null,
  password: null,
  login: () => {},
  request: () => {},
  authHandler: () => {}
})