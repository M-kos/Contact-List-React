import {createContext} from 'react'

export const AppContext = createContext({
  isAuth: false,
  name: null,
  password: null,
  login: () => {},
  request: () => {},
  authHandler: () => {}
})