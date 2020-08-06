import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from './routes'
import { AppContext } from './context/appContext'
import { Http } from './services/http'
import { login, logout } from './utils/login'
import { authRequestOptions } from './utils/authRequestOptions'

import 'materialize-css'
import './App.css'

export default class App extends Component {
  state = {
    isAuth: false,
    userId: null,
  }

  componentDidMount() {
    this.checkAuth()
  }

  checkAuth = async () => {
    const user = login()

    if (user && user.name && user.password) {
      try {
        const result = await Http.request(
          authRequestOptions(user.name, user.password)
        )

        if (result) {
          this.authHandler(!!result, result.id)
        }
        return
      } catch (error) {}
    }
  }

  authHandler = (value, id) => {
    this.setState({
      isAuth: value,
      userId: id,
    })
  }

  render() {
    const { isAuth, userId } = this.state
    const routes = useRoutes(isAuth)

    return (
      <AppContext.Provider
        value={{
          userId,
          isAuth,
          request: Http.request,
          login,
          logout,
          authHandler: this.authHandler,
        }}
      >
        <BrowserRouter>
          <div className="App">{routes}</div>
        </BrowserRouter>
      </AppContext.Provider>
    )
  }
}
