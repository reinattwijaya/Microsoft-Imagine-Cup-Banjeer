import React from 'react'
import './map.css'
import DocIU from './static/doc_iu.jpg' 
import PreIU from './static/pretty_iu.jpg'
import LoveIU from './static/love_iu.jpg'

export default class Map extends React.Component{
  constructor(props){
    super(props)
    this.canvasRef  = React.createRef()
    this.state = {
      zoom          : 1, 
      position      : [0, 0],
      currentImage  : null, 
      offSet        : [0, 0]
    }
  }
  parseFullImage(num_x, num_y){
    const canvas  = this.canvasRef.current
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height);
    const fullImage = []
    const zoom      = this.state.zoom
    for(let i = 0; i < num_x; i++){
      const row = []
      for(let j = 0; j < num_y; j++){
        const image   = new Image(1024, 1024)
        row.push(image)
        image.src = DocIU
        image.onload = () => {
          context.drawImage(image, 
            this.state.offSet[0] + j * 1024, this.state.offSet[1] + i * 1024,
            1024 / zoom, 1024 / zoom
          )
        }
      }
      fullImage.push(row)
    }
    this.setState({currentImage : fullImage})
  }
  componentDidMount(){
    this.parseFullImage(10, 10)
  }
  handleHover = () => {
    const offSet  = this.state.offSet
    this.setState({
      offSet : [offSet[0] , offSet[1] - 10]
    }, () => {
      this.parseFullImage(10, 10)
    })
  }
  render(){
    return(
      <div className = 'map-container'>
        <canvas onMouseOver = {this.handleHover} ref = {this.canvasRef}>

        </canvas>
      </div>
    )
  }
}