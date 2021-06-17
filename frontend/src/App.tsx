import './scss/App.scss'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import {Provider} from 'react-redux'
import Navbar from './components/Navbar'
import Routes from './Routes'
import {store} from './services/store'

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Navbar />
        <div className="container main-container"><Routes /></div>
      </Provider>
    </Router>
  )
}

export default App;
