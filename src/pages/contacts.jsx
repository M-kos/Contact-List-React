import React from 'react'
import { AppContext } from '../context/appContext'
import { ContactList } from '../components/ContactList/ContactLict'

export const Contacts = () => {
  const logoutHandler = (logoutFn, authFn) => {
    logoutFn()
    authFn(false)
  }

  return (
    <div className="container">
      <AppContext.Consumer>
        {({ request, logout, authHandler, userId }) => {
          return (
            <>
              <div className="row right-align">
                <div className="col s6 offset-s4" style={{ marginTop: 16 }}>
                  <button
                    className="btn"
                    onClick={() => logoutHandler(logout, authHandler)}
                  >
                    Logout
                  </button>
                </div>
              </div>
              <ContactList request={request} userId={userId} />
            </>
          )
        }}
      </AppContext.Consumer>
    </div>
  )
}
