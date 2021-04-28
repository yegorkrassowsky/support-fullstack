import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import TicketListPage from '../pages/TicketListPage'
import LoginPage from '../pages/LoginPage'
import {useStore} from '../store'

const Routes: React.FC = () => {
  const {loggedIn} = useStore()

  if(loggedIn) {
    return (
      <Switch>
        <Route path='/' exact component={TicketListPage} />
        <Redirect to='/' />
      </Switch>
    )
  }
  return (
    <Switch>
      <Route path='/login' exact component={LoginPage} />
      <Redirect to='/login' />
    </Switch>
  )
}

export default Routes