import React from 'react'
import './map.css'
import LazyLoad from 'react-lazyload'

function importAll(r){
  let images  = {}
  r.keys().foreach((item, index) => {
    images[item.replace('./', '')] = r(item)
  })
  return images
}

//const image   = importAll(require.context('./static', false, /\.(png|jpe?g|svg)$/))

export default class Map extends React.Component{
  constructor(props){
    super(props)
    // write the max pixel size in the form [width, height]
    // If this method did not work, replace by backend loading the image
    // TODO : REINATT LOL KERJAIN 
    // TODO : LOL LAZY LOADING LIHAT NAT
    // TODO : KALAU GA BISA JUGA, AMBIL SEBAGIAN LAH YANG SABI
    this.imageSize  = {
      width   : 41984, height : 192512
    }
  }
  renderImage(){
    // replace i++ and j++ with the correct increment
    const render  = []
    for(let i = 68608; i < this.imageSize.height; i+=1024){
      const row   = []
      for(let j = 0; j < this.imageSize.width; j+=1024){
        row.push(
          <div className = 'image-hor'>
            <img src = {require(`./static/downsized_img/${i}_${j}.jpeg`)} loading='lazy'/>
          </div>
        )
      }
      render.push(
        <div className = 'image-vert'>
          {row}
        </div>
      )
    }
    return(
      <React.Fragment>
        {render}
      </React.Fragment>
    )
  }
  render(){
    return(
      <div className = 'map-container'>
        {this.renderImage()}
      </div>
    )
  }
}