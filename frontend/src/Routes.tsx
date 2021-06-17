import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import TicketListPage from './pages/TicketListPage'
import TicketPage from './pages/TicketPage'
import LoginPage from './pages/LoginPage'
import NewTicketPage from './pages/NewTicketPage'
import {roles} from './constants'
import {ILoggedIn, IState, IUserRoles} from './interfaces'
import { getTickets } from './actions/ticketList'
import {ThunkDispatchType, GetTicketsType} from './types'

type RoutesProps = {
  getTickets: GetTicketsType
} & ILoggedIn & IUserRoles

const Routes: React.FC<RoutesProps> = ({loggedIn, userRoles, getTickets}) => {
  useEffect(()=>{
    if(loggedIn) getTickets()
  }, [loggedIn, getTickets])
  if(loggedIn) {
    return (
      <Switch>
        <Route path='/' exact component={TicketListPage} />
        <Route path='/ticket/:id' component={TicketPage} />
        {userRoles.includes(roles.client) ? <Route path='/new-ticket' exact component={NewTicketPage} /> : null}
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

const mapDispatchToProps = (dispatch: ThunkDispatchType) => ({
  getTickets: () => dispatch(getTickets())
})

export default connect((state: IState) => ({
  loggedIn: state.auth.loggedIn,
  userRoles: state.auth.userRoles,
}), mapDispatchToProps)(Routes)
