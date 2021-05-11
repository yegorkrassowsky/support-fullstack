import React from 'react'
import { NavLink } from 'react-router-dom'
import {useStore} from '../store'
import useAPI from '../services/api'

const Navbar: React.FC = () => {
  const {loggedIn, userName} = useStore()  
  const {logout} = useAPI()
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary main-navbar">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse">
          {loggedIn ? (
            <>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link" to='/'>Dashboard</NavLink>
                </li>
              </ul>
              <ul className="navbar-nav">
                <span className="navbar-text">{userName}</span>
                <li className="nav-item"><button className="btn btn-link nav-link" onClick={logout}>Logout</button></li>
              </ul>
            </>
          ) : (
            <ul className="navbar-nav">
              <li className="nav-item"><NavLink className="nav-link" to='/login'>Login</NavLink></li>
            </ul>
          ) }
        </div>
      </div>
    </nav>

  )
}

export default Navbar