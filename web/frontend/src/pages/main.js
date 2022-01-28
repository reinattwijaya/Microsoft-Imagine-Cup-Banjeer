import React from 'react'
import axios from 'axios'
import './main.css'
import mainBg from './static/main_bg.jpeg'
import IU1 from './static/IU 1.jpg'
import IU2 from './static/IU 2.jpg'
import IU3 from './static/IU 3.jpg'
import Loading from '../core/loading'

const Map = React.lazy(() => import('../map reader/map'))

class MapMain extends React.Component{
  constructor(props){
    super(props)
    this.state  = {
      search_query  : '', 
      warn          : '', 
      query         : false,
      query_return  : [{
        name      : '', 
        condition : '', 
        advice    : [], 
      }],
      cur_page      : 0, 
      max_page      : 0, 
      search_text   : 'Search Results'
    }
  }
  inputChange = (event) => {
    this.setState({
      search_query  : event.target.value
    })
  }
  searchClick = () =>{
    let baseUrl   = process.env.REACT_APP_API_ENDPOINT != undefined ? process.env.REACT_APP_API_ENDPOINT : 'http://localhost:8000/api'
    let url       = `${baseUrl}/river/?search=${this.state.search_query}`
    axios.get(url)
    .then((resp) => {
      let data    = resp.data
      if(data.length === 0){
        this.setState({
          query_return  : [],
          query         : true,
          search_text   : 'No Matching Queries' 
        })
      }
      else{
        data    = data.map((val, id) => {
          return {
            name      : val.name, 
            condition : val.condition, 
            advice    : val.advice.split(',')
          }
        })
        let len = data.length
        let pag = Math.floor(len / 2)
        this.setState({
          query         : true,
          query_return  : data,
          search_text   : 'Search Results',
          cur_page      : 0, 
          max_page      : pag
        })
      }
    })
    .catch((err) => {
      if(err && err.response){
        this.setState({
          warn : 'backend error'
        })
      }
    })
  }
  renderSearchResult(){
    const render = this.state.query_return.map((val, id) => {
      let current_page = this.state.cur_page * 2
      if(id === current_page || id === current_page + 1){
        return(
          <div key = {id} className = 'main-search-block'>
            <div className = 'main-search-numbering'>
              <p>{id + 1}.</p>
            </div>
            <div className = 'main-search-content'>
              <div className = 'main-search-name'>
                <p>{val.name}</p>
              </div>
              <div className = 'main-search-condition'>
                <div className = 'main-search-condition-title'>
                  <p>Condition</p>
                </div>
                <div className = 'main-search-condition-content'>
                  <p>{val.condition}</p>
                </div>
              </div>
              <div className = 'main-search-advice'>
                <div className = 'main-search-advice-title'>
                  <p>Advice</p>
                </div>
                <div className = 'main-search-condition-content'>
                  {val.advice.map((val, id) => 
                    <p key = {id}>{val}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      }
    })
    return(
      <React.Fragment key = {this.state.cur_page}>
        {render}
      </React.Fragment>
    )
  }
  prevPage = () => {
    if(this.state.cur_page > 0) this.setState({cur_page : this.state.cur_page - 1})
  }
  nextPage = () => {
    if(this.state.cur_page < this.state.max_page - 1) this.setState({cur_page : this.state.cur_page + 1})
  }
  render(){
    return(
      <section id = 'main-app' className = 'main-app'>
        <div className = 'main-app-main'>
          <div className = 'main-map'>
            <React.Suspense fallback = {Loading}>
              <Map />
            </React.Suspense>
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
                <p>{this.state.search_text}</p>
              </div>
              <div className = 'main-search-detail'>
                {this.renderSearchResult()}
              </div>
              <div className = 'main-search-nav' key = {this.state.cur_page}>
                <button 
                  className = {this.state.cur_page > 0 ? '' : 'hidden'}
                  onClick = {this.prevPage}>{'<'}</button>
                <button 
                  className = {this.state.cur_page < this.state.max_page - 1 ? '' : 'hidden'} 
                  onClick = {this.nextPage}>{'>'}</button>
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