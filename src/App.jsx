import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from './routes'
import { AuthContext } from './context/authContext'
import { Http } from './services/http'
import { login } from './utils/login'
import { authRequestOptions } from './utils/authRequestOptions'

import 'materialize-css'
import './App.css'

export default class App extends Component {
  state = {
    isAuth: false,
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
          this.authHandler(!!result)
        }
        return
      } catch (error) {}
    }
  }

  authHandler = (value) => {
    this.setState({
      isAuth: value,
    })
  }

  render() {
    const { isAuth } = this.state
    const routes = useRoutes(isAuth)

    return (
      <AuthContext.Provider
        value={{
          isAuth,
          request: Http.request,
          login,
          authHandler: this.authHandler,
        }}
      >
        <BrowserRouter>
          <div className="App">{routes}</div>
        </BrowserRouter>
      </AuthContext.Provider>
    )
  }
}
