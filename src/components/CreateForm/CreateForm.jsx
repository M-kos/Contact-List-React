import React, { Component } from 'react'
import { Preloader } from '../Preloader/Preloader'

import './CreateForm.css'

export class CreateForm extends Component {
  state = {
    name: '',
    phone: '',
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    const { loading, createHandler } = this.props
    const { name, phone } = this.state
    const isDisabled = !name && !phone

    return (
      <div className="overlay">
        <div className="row">
          <div className="col s4 offset-s4">
            <div className="card">
              <div className="card-content">
                <span className="card-title">Create</span>
                <div className="input-field">
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={this.changeHandler}
                  />
                  <label htmlFor="name">Name</label>
                </div>
                <div className="input-field">
                  <input
                    id="phone"
                    type="number"
                    name="phone"
                    value={phone}
                    onChange={this.changeHandler}
                  />
                  <label htmlFor="phone">Phone</label>
                </div>
              </div>
              <div className="card-action right-align">
                <button
                  className="btn create-form-btn"
                  disabled={isDisabled}
                  onClick={() => createHandler({ name, phone })}
                >
                  Create
                </button>
                <button className="btn create-form-btn" onClick={createHandler}>
                  Close
                </button>
              </div>
              <Preloader isLoading={loading} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
