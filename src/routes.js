import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {Contacts} from './pages/contacts'
import Login from './pages/login'

export const useRoutes = isAuth => {
  if (isAuth) {
    return (
      <Switch>
        <Route path="/contacts" exact>
          <Contacts />
        </Route>
      <Redirect to="/contacts" />

      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Redirect to="/login" />
    </Switch>
  )
}