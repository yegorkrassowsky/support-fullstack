import React from 'react'
import { NavLink } from 'react-router-dom'
import {useStore} from '../services/store'

const Navbar: React.FC = () => {
  const {auth, logout} = useStore()
  if(!auth.loggedIn) {
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
            <span className="navbar-text">Hi, {auth.userName}</span>
            <button className="btn btn-link nav-link logout-btn" title="Logout" onClick={logout}><i className="fas fa-door-open"></i></button>
          </li>
        </ul>
      </div>
    </nav>

  )
}

export default Navbar