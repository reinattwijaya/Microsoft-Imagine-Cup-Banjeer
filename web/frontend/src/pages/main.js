import React from 'react'
import Map from '../map reader/map'
import axios from 'axios'
import './main.css'
import mainBg from './static/main_bg.jpeg'

class MapMain extends React.Component{
  constructor(props){
    super(props)
    this.state  = {
      search_query  : '', 
      warn          : '', 
      query         : false
    }
  }
  inputChange = (event) => {
    this.setState({
      search_query  : event.target.value
    })
  }
  searchClick = () =>{
    let postData  = {
      
    }
    let url       = ''
    axios.post(url, postData)
    .then((resp) => {
      this.setState({
        query : true
      })
    })
    .catch((err) => {
      if(err && err.response){
        this.setState({
          warn : 'backend error'
        })
      }
    })
  }
  goUp = () => {
    window.location.href = '#main-title'
  }
  render(){
    return(
      <section id = 'main-app' className = 'main-app'>
        <div className = 'main-app-nav'>
          <button onClick = {this.goUp}>go up</button>
        </div>
        <div className = 'main-app-main'>
          <div className = 'main-map'>
            <Map />
          </div>
          <div className = 'main-search'>
            <div className = 'main-search-bar'>
              <p>Search for a place</p>
              <div className = 'main-search-input'>
                <input 
                  type = 'text' 
                  value = {this.state.search_query} 
                  onChange = {this.inputChange}
                />
                <button onClick = {this.searchClick}><p>search</p></button>
              </div>
              <p>{this.state.warn}</p>
            </div>
            <div className ={`main-search-result ${!this.state.query ? 'hide' : 'show'}`}>
              <div className = 'main-search-title'>
                <p>Search Result</p>
              </div>
              <div className = 'main-search-detail'>

              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

class MapTitle extends React.Component{
  constructor(props){
    super(props)
  }
  navDown = () => {
    window.location.href = '#main-app'
  }
  render(){
    return(
      <section id = 'main-title' className = 'main-title-container'>
        <div className = 'main-img'>
            
        </div>
        <div className = 'main-title'>
          <div className = 'main-heading'>
            <h1>Banjeer</h1>
          </div>
          <div className = 'main-desc'>
            <p>Changing the World with Artificial Intelligence</p>
          </div>
        </div>
        <div className = 'nav-button'>
          <button onClick = {this.navDown}>This button is to go down</button>
        </div>
      </section>
    )
  }
}
export default class Main extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className = 'main-page'>
        <MapTitle />
        <MapMain />
      </div>
    )
  }
}