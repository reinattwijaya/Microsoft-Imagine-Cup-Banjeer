import React from 'react'
import {
  BrowserRouter as Router, 
  Routes, 
  Route,
  useParams,
  Navigate
} from 'react-router-dom'

import Main from '../pages/main'
import AboutUs from '../pages/aboutus'
import BanjeerApp from '../pages/banjeerapp'
import Navbar from '../core/navbar'

export default class MainRouting extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <Router>
        <header className = 'banjeer-head'>
          <Navbar />
        </header>
        <main className = 'banjeer-main'>
          <Routes>
            <Route path = '/' element = {<Main />}/>
            <Route path = '/about-us' element = {<AboutUs />} />
            <Route path = '/banjeer-app' element = {<BanjeerApp />} />
          </Routes>
        </main>
      </Router>
    )
  }
}