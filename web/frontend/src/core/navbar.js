import React from 'react'
import './navbar.css'

export default class Navbar extends React.Component{
  constructor(props){
    super(props)
    this.linkSets   = [{
      name      : 'home', 
      className : 'home', 
      link      : '/'
    }, {
      name      : 'about us', 
      className : 'about-us', 
      link      : '/about-us'
    }, {
      name      : 'banjeer app',
      className : 'banjeer-app', 
      link      : '/banjeer-app'
    }]
  }
  navigateLink = (link) => {
    window.location.href = link
  }
  render(){
    return(
      <nav>
        <div className = 'navbar-title'>
          <p>banjeer</p>
        </div>
        <div className = 'navbar-links'>
          {this.linkSets.map((val, id) => 
            <div className = {`${val.className}-link navbar-link`} key = {id} onClick = {() => this.navigateLink(val.link)}>
              <p>{val.name}</p>
            </div>
          )}
        </div>
      </nav>
    )
  }
}