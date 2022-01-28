import React from 'react'
import MainRouting from './routes/routes'
import './index.css'

export default class App extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <MainRouting />
    )
  }
}