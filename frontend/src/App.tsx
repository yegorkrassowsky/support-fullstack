import './scss/App.scss'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/Navbar'
import Routes from './Routes'
import {StoreProvider} from './services/store'

function App() {
  return (
    <Router>
        <StoreProvider>
          <Navbar />
          <div className="container main-container"><Routes /></div>
        </StoreProvider>
    </Router>
  )
}

export default App;
