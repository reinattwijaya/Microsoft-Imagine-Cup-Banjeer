import React from 'react'
import {
  BrowserRouter as Router, 
  Routes, 
  Route,
} from 'react-router-dom'

import Navbar from '../core/navbar'
import Loading from '../core/loading'


const Main  = React.lazy(() => import('../pages/main'))
const AboutUs = React.lazy(() => import('../pages/aboutus'))
const BanjeerApp = React.lazy(() => import('../pages/banjeerapp'))

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
        <React.Suspense fallback = {Loading}>
          <main className = 'banjeer-main'>
            <Routes>
              <Route path = '/' element = {<Main />} />
              <Route path = 'about-us' element = {<AboutUs />}/>
              <Route path = 'banjeer-app' element = {<BanjeerApp />}/>
            </Routes>
          </main>
        </React.Suspense>
      </Router>
    )
  }
}