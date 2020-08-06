import React, { Component } from 'react'
import { AppContext } from '../context/appContext'
import { Preloader } from '../components/Preloader/Preloader'
import { authRequestOptions } from '../utils/authRequestOptions'
export default class Login extends Component {
  state = {
    name: '',
    password: '',
    loading: false,
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  requestHandler = async (requestFn, loginFn, authHandlerFn) => {
    const { name, password } = this.state
    const options = authRequestOptions(name, password)

    try {
      this.setState({
        loading: true,
      })

      const req = await requestFn(options)

      if (!req) {
        throw new Error(req.message || 'Something went wrong')
      }

      this.setState({
        name: '',
        password: '',
        loading: false,
      })

      loginFn(req)
      authHandlerFn(!!req, req.id)
    } catch (error) {
      this.setState({
        loading: false,
      })
    }
  }

  render() {
    const { name, password, loading } = this.state

    const isDisabled = !name || !password || loading

    return (
      <AppContext.Consumer>
        {({ request, login, authHandler }) => {
          return (
            <div className="row">
              <div className="col s4 offset-s4">
                <div className="card">
                  <div className="card-content">
                    <span className="card-title">Login</span>
                    <div>
                      <div className="input-field">
                        <input
                          placeholder="Enter your name"
                          id="name"
                          type="text"
                          name="name"
                          onChange={this.changeHandler}
                          value={name}
                        />
                        <label htmlFor="name">Name</label>
                      </div>
                      <div className="input-field">
                        <input
                          placeholder="Enter your password"
                          id="password"
                          type="password"
                          name="password"
                          onChange={this.changeHandler}
                          value={password}
                        />
                        <label htmlFor="password">Password</label>
                      </div>
                    </div>
                  </div>
                  <div className="card-action right-align">
                    <button
                      className="btn"
                      onClick={() =>
                        this.requestHandler(request, login, authHandler)
                      }
                      disabled={isDisabled}
                    >
                      Login
                    </button>
                  </div>
                  <Preloader isLoading={loading} />
                </div>
              </div>
            </div>
          )
        }}
      </AppContext.Consumer>
    )
  }
}
