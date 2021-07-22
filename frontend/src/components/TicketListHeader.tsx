import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {IState, IUserRoles} from '../interfaces'
import {roles} from '../constants'


type TicketListHeaderProps = {} & IUserRoles

const TicketListHeader: React.FC<TicketListHeaderProps> = ({userRoles}) => {
  if(userRoles.includes(roles.client)) return (
    <>
      <h1>Your tickets</h1>
      <div className="d-flex justify-content-end">
        <Link className="btn btn-primary" to='/new-ticket'>New ticket</Link>
      </div>
    </>
  )
  return <h1>Tickets</h1>
}

const mapStateToProps = (state: IState) => ({
  userRoles: state.auth.userRoles,
})

export default connect(mapStateToProps)(TicketListHeader)
