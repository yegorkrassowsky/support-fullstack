import React from 'react'
import { NavLink } from 'react-router-dom'
import {useStore} from '../store'
import useAPI from '../services/api'

const Navbar: React.FC = () => {
  const {loggedIn} = useStore()
  const {logout} = useAPI()
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {loggedIn ? (
              <>
                <button className="btn btn-link" onClick={logout}>Logout</button>
                <li className="nav-link">
                  <NavLink to='/'>Dashboard</NavLink>
                </li>
              </>
            ) : (
              <li className="nav-link"><NavLink to='/login'>Login</NavLink></li>
            ) }
          </ul>
        </div>
      </div>
    </nav>

  )
}

export default Navbar