import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {logout} from '../actions/auth'
import {IState, IAuthState} from '../interfaces'
import {ThunkDispatchType} from '../types'

type NavbarProps = {
  auth: IAuthState
  onLogout: Function
}

const Navbar: React.FC<NavbarProps> = ({auth, onLogout}) => {
  const {loggedIn, userName} = auth
  const logoutHandler = (e: React.MouseEvent) => {
    onLogout()
  }
  if(!loggedIn) {
    return <></>
  }
  return (
    <nav className="navbar navbar-dark bg-primary main-navbar">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to='/'>Dashboard</NavLink>
          </li>
          <li className="nav-item">
            <span className="navbar-text">Hi, {userName}</span>
            <button className="btn btn-link nav-link logout-btn" title="Logout" onClick={logoutHandler}><i className="fas fa-door-open"></i></button>
          </li>
        </ul>
      </div>
    </nav>

  )
}

const mapDispatchToProps = (dispatch: ThunkDispatchType) => ({
  onLogout: () => {
    dispatch(logout())
  }
})

export default connect((state: IState) => ({
  auth: state.auth
}), mapDispatchToProps)(Navbar)