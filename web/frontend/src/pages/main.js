import React from 'react'
import Map from '../map reader/map'
import axios from 'axios'
import './main.css'
import mainBg from './static/main_bg.jpeg'
import IU1 from './static/IU 1.jpg'
import IU2 from './static/IU 2.jpg'
import IU3 from './static/IU 3.jpg'

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
    this.main   = 'Let the Rivers Flow !'
    this.state  = {
      curImg  : 0, 
    }
    this.imgSrc = [mainBg, IU1, IU2, IU3]
  }
  navDown = () => {
    window.location.href = '#main-app'
  }
  renderSlideshow(){
    const size  = this.imgSrc.length
    var aft, bef
    if(this.state.curImg == 0){
      aft = 1
      bef = size - 1
    }
    else if(this.state.curImg == size){
      aft = 0
      bef = this.state.curImg - 1
    }
    else{
      aft = this.state.curImg + 1
      bef = this.state.curImg - 1
    }
    return(
      <React.Fragment>
        {this.imgSrc.map((val, id) => {
          const className = id == aft ? 'slid-aft' : id == bef ? 'slid-bef' : id == this.state.curImg ? 'slid-cur' : 'slid-hid'
          return(
            <img src = {val} key = {id} className = {className} />
          )
        })}
      </React.Fragment>
    )
  }
  navLeft = () => {
    if(this.state.curImg == 0){
      this.setState({curImg : this.imgSrc.length - 1})
    }
    else{
      this.setState({curImg : this.state.curImg - 1})
    }
  }
  navRight = () => {
    if(this.state.curImg == this.imgSrc.length - 1){
      this.setState({curImg : 0})
    }
    else{
      this.setState({curImg : this.state.curImg + 1})
    }
  }
  render(){
    return(
      <section id = 'main-title' className = 'main-title-container'>
        <div className = 'main-img'>
          {this.renderSlideshow()}
        </div>
        <div className = 'main-title'>
          <div className = 'main-heading'>
            <h1>Banjeer</h1>
          </div>
          <div className = 'main-desc'>
            <p>{this.main}</p>
          </div>
        </div>
        <div className = 'main-control'>
          <button onClick = {this.navLeft}> {'<'} </button>
          <button onClick = {this.navRight}> {'>'} </button>
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