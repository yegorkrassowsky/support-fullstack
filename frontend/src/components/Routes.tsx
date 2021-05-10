import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import TicketListPage from '../pages/TicketListPage'
import TicketPage from '../pages/TicketPage'
import LoginPage from '../pages/LoginPage'
import NewTicketPage from '../pages/NewTicketPage'
import {useStore} from '../store'

const Routes: React.FC = () => {
  const {loggedIn} = useStore()

  if(loggedIn) {
    return (
      <Switch>
        <Route path='/' exact component={TicketListPage} />
        <Route path='/new-ticket' exact component={NewTicketPage} />
        <Route path='/ticket/:id' component={TicketPage} />
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