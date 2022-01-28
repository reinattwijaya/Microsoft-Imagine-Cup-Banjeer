import React from 'react'
import './aboutus.css'
import Jowi from './static/jowi.jpg'
import Irfan from './static/irfan.jpg'
import Izaaz from './static/Izaaz.jpg'
import Reinatt from './static/reinatt.jpg'

const imgLink = 'https://ktofscience.files.wordpress.com/2020/08/anonymousappcontactsopenlineprofileusericon-1320183042822068474_512.png'
export default class AboutUs extends React.Component{
  constructor(props){
    super(props)
    this.data   = [{
      name    : 'Muhammad Irfan Akbar', 
      major   : ['Computer Science', 'Business and Technology Management'], 
      univ    : ['KAIST', 'Korea Advanced Institute of Science and Technology'], 
      image   : Irfan, 
      quote   : ['Ruangguru Business Innovation Challenge (Semifinalist)', 'Rotman-UNIST Trading Competition (First Prize Winner)',
    'JunctionX Seoul Hackathon AI track (First Prize Winner)']
    }, {
      name    : 'Jonathan Willianto', 
      major   : ['Mechanical Engineering', 'Computer Science'], 
      univ    : ['KAIST', 'Korea Advanced Institute of Science and Technology'], 
      image   : Jowi, 
      quote   : ['Gold Medal National Physics Olympiad 2019']
    }, {
      name    : 'Reinatt Hansel Wijaya', 
      major   : ['Computer Science', 'Business and Technology Management'], 
      univ    : ['KAIST', 'Korea Advanced Institute of Science and Technology'], 
      image   : Reinatt, 
      quote   : ['Silver Medal National Informatics Olympiad 2018']
    }, {
      name    : 'Muhammad Izaaz Inhar Ramahdani', 
      major   : ['Computer Science', 'Civil Engineering'], 
      univ    : ['KAIST', 'Korea Advanced Institute of Science and Technology'], 
      image   : Izaaz, 
      quote   : ['Bronze Medal National Informatics Olympiad 2018']
    }]
  }
  charaSheet(){
    const render = this.data.map((val, id) => 
      <div className = 'aboutus-cont'>
        <div className = 'aboutus-img'>
          <img src = {val.image}/>
        </div>
        <div className = 'aboutus-detail'>
          <div className = 'aboutus-name'>
            <p>{val.name}</p>
          </div>
          <div className = 'aboutus-major'>
            <p>{val.major[0]}</p>
            <p> & </p>
            <p>{val.major[1]}</p>
          </div>
          <div className = 'aboutus-univ'>
            <p>{val.univ[0]}</p>
          </div>
          <p>Awards : </p>
          <div className = 'aboutus-quote'>
            {val.quote.map((value, id) => <p key = {id}>{value}</p>)}
          </div>
        </div>
      </div>
    )
    return render
  }
  render(){
    return(
      <div className = 'about-us'>
        {this.charaSheet()}
      </div>
    )
  }
}