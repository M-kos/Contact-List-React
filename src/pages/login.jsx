import React from 'react'

export const Login = () => {
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
                  placeholder="Name"
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Enter your password"
                  id="password"
                  type="password"
                  name="password"
                />
                <label htmlFor="email">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action right-align">
            <button className="btn">Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}
