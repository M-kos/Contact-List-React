import React, { Component } from 'react'
import { Preloader } from '../Preloader/Preloader'
import { ContactItem } from '../ContactItem/ContactItem'
import { EmptyData } from '../EmptyData/EmptyData'
import { CreateForm } from '../CreateForm/CreateForm'
import { contactsRequestOptions } from '../../utils/contactsRequestOptions'

export class ContactList extends Component {
  state = {
    contacts: [],
    loading: false,
    creating: false,
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

      this.loadingHandler(false)
    } catch (error) {
      this.loadingHandler(false)
    }
  }

  updateContact = async (id) => {
    const options = contactsRequestOptions(id, 'PATCH')

    await this.requestHandler(options)
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
        this.loadingHandler(false)
        return result
      }
    } catch (error) {
      this.loadingHandler(false)
    }
  }

  onCreate = () => {
    this.setState({
      creating: true,
    })
  }

  createHandler = async (contact) => {
    if (contact.name || contact.phone) {
      const { userId } = this.props
      try {
        this.loadingHandler(true)

        await this.createContact({ ...contact, userId })
        await this.getContacts()

        this.loadingHandler(false)
      } catch (error) {
        this.loadingHandler(false)
      }
    }

    this.setState({
      creating: false,
    })
  }

  loadingHandler = (value) => {
    this.setState({
      loading: value,
    })
  }

  render() {
    const { loading, contacts, creating } = this.state

    const contactList = contacts.length ? (
      contacts.map(({ id, name, phone }) => {
        return (
          <ContactItem
            key={id}
            name={name}
            phone={phone}
            onDelete={() => {
              this.deleteContact(id)
            }}
          />
        )
      })
    ) : (
      <EmptyData />
    )

    const createForm = creating ? (
      <CreateForm loading={loading} createHandler={this.createHandler} />
    ) : null

    return (
      <div className="row">
        {createForm}
        <div className="col s6 offset-s3">
          <div className="card">
            <div className="card-content">
              <span className="card-title">Contacts</span>
              <ul className="collection">{contactList}</ul>
            </div>
            <div className="card-action right-align">
              <button className="btn" onClick={this.onCreate}>
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
