import React, { Component } from 'react'
import { Preloader } from '../Preloader/Preloader'

import './ContactForm.css'

export class ContactForm extends Component {
  state = {
    name: '',
    phone: '',
  }

  componentDidMount() {
    const { changeableContact } = this.props

    if (changeableContact.name || changeableContact.phone) {
      this.setState(
        {
          name: changeableContact.name || '',
          phone: changeableContact.phone || '',
        },
        () => {
          if (window.M) {
            window.M.updateTextFields()
          }
        }
      )
    }
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    const { loading, formHandler } = this.props
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
                    type="text"
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
                  onClick={() => formHandler({ name, phone })}
                >
                  Save
                </button>
                <button className="btn create-form-btn" onClick={formHandler}>
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
