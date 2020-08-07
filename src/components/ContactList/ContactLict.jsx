import React, { Component } from 'react'
import { Preloader } from '../Preloader/Preloader'
import { ContactItem } from '../ContactItem/ContactItem'
import { EmptyData } from '../EmptyData/EmptyData'
import { ContactForm } from '../ContactForm/ContactForm'
import { contactsRequestOptions } from '../../utils/contactsRequestOptions'

export class ContactList extends Component {
  state = {
    contacts: [],
    loading: false,
    showForm: false,
    changeableContact: {},
    formMethod: '',
    searchValue: '',
  }

  async componentDidMount() {
    await this.getContacts()
  }

  getContacts = async () => {
    const { userId } = this.props
    const options = contactsRequestOptions(userId, 'GET')

    const contacts = await this.requestHandler(options)

    this.setState({
      contacts,
    })
  }

  deleteContact = async (id) => {
    const options = contactsRequestOptions(id, 'DELETE')

    try {
      this.loadingHandler(true)

      await this.requestHandler(options)
      await this.getContacts()
    } catch (error) {
    } finally {
      this.loadingHandler(false)
    }
  }

  updateContact = async (id, contact) => {
    const options = contactsRequestOptions(id, 'PATCH', contact)

    try {
      this.loadingHandler(true)
      const result = await this.requestHandler(options)

      if (result && result.id) {
        this.setState(({ contacts }) => {
          const idx = contacts.findIndex((contact) => contact.id === result.id)
          const newContact = { ...contacts[idx], ...result }

          return {
            contacts: [
              ...contacts.slice(0, idx),
              newContact,
              ...contacts.slice(idx + 1),
            ],
          }
        })
      }
    } catch (error) {
    } finally {
      this.loadingHandler(false)
    }
  }

  createContact = async (body) => {
    const options = contactsRequestOptions(null, 'POST', body)

    await this.requestHandler(options)
  }

  requestHandler = async (options) => {
    this.loadingHandler(true)

    const { userId, request } = this.props
    options.headers['authorization'] = userId

    try {
      const result = await request(options)

      if (result) {
        return result
      }
    } catch (error) {
    } finally {
      this.loadingHandler(false)
    }
  }

  showFormHandler = (method, contact) => {
    this.setState({
      showForm: true,
      changeableContact: contact ? { ...contact } : {},
      formMethod: method,
    })
  }

  formHandler = async (contact) => {
    if (contact.name || contact.phone) {
      const { userId } = this.props
      const {
        changeableContact: { id },
        formMethod,
      } = this.state

      try {
        this.loadingHandler(true)

        switch (formMethod) {
          case 'create':
            await this.createContact({ ...contact, userId })
            await this.getContacts()
            break
          case 'update':
            await this.updateContact(id, contact)
            break
          default:
            break
        }

        this.loadingHandler(false)
      } catch (error) {
        this.loadingHandler(false)
      }
    }

    this.setState({
      changeableContact: {},
      formMethod: '',
      showForm: false,
    })
  }

  loadingHandler = (value) => {
    this.setState({
      loading: value,
    })
  }

  searchHandler = (event) => {
    this.setState({
      searchValue: event.target.value,
    })
  }

  render() {
    const {
      loading,
      contacts,
      showForm,
      changeableContact,
      searchValue,
    } = this.state

    const contactList = contacts
      .filter(({ name }) =>
        name.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map(({ id, name, phone }) => {
        return (
          <ContactItem
            key={id}
            name={name}
            phone={phone}
            onDelete={() => {
              this.deleteContact(id)
            }}
            showFormHandler={() => {
              this.showFormHandler('update', { id, name, phone })
            }}
          />
        )
      })

    const view = contactList.length ? contactList : <EmptyData />

    const contactForm = showForm ? (
      <ContactForm
        loading={loading}
        formHandler={this.formHandler}
        changeableContact={changeableContact}
      />
    ) : null

    return (
      <div className="row">
        {contactForm}
        <div className="col s6 offset-s3">
          <div className="card">
            <div className="card-content">
              <span className="card-title">Contacts</span>
              <div className="input-field">
                <input
                  id="search"
                  type="text"
                  name="search"
                  value={searchValue}
                  onChange={this.searchHandler}
                />
                <label htmlFor="name">Search</label>
              </div>
              <ul className="collection">{view}</ul>
            </div>
            <div className="card-action right-align">
              <button
                className="btn"
                onClick={() => this.showFormHandler('create')}
              >
                Create
              </button>
            </div>
            <Preloader isLoading={loading} />
          </div>
        </div>
      </div>
    )
  }
}
