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
      quote   : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. \
                Excepteur sint occaecat cupidatat non proident, \sunt in culpa qui officia deserunt mollit anim id est laborum."
    }, {
      name    : 'Jonathan Willianto', 
      major   : ['Mechanical Engineering', 'Computer Science'], 
      univ    : ['KAIST', 'Korea Advanced Institute of Science and Technology'], 
      image   : Jowi, 
      quote   : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. \
                Excepteur sint occaecat cupidatat non proident, \sunt in culpa qui officia deserunt mollit anim id est laborum."
    }, {
      name    : 'Reinatt Hansel Wijaya', 
      major   : ['Computer Science', 'Business and Technology Management'], 
      univ    : ['KAIST', 'Korea Advanced Institute of Science and Technology'], 
      image   : Reinatt, 
      quote   : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. \
                Excepteur sint occaecat cupidatat non proident, \sunt in culpa qui officia deserunt mollit anim id est laborum."
    }, {
      name    : 'Muhammad Izaaz Inhar Ramahdani', 
      major   : ['Computer Science', 'Civil Engineering'], 
      univ    : ['KAIST', 'Korea Advanced Institute of Science and Technology'], 
      image   : Izaaz, 
      quote   : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. \
                Excepteur sint occaecat cupidatat non proident, \sunt in culpa qui officia deserunt mollit anim id est laborum."
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
          <div className = 'aboutus-quote'>
            <p>"{val.quote}"</p>
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