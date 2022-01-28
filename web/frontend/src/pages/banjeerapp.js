import React from 'react'
import './banjeerapp.css'
import Annot from './static/annot.JPG'

export default class BanjeerApp extends React.Component{
  constructor(props){
    super(props)
    this.state  = {
      file_form   : {
        value   : null, 
        warn    : ''
      }, 
      file_process: false, 
      img_preview : null
    }
  }
  componentWillUnmount(){
    URL.revokeObjectURL(this.state.img_preview)
  }
  uploadFile = (event) => {
    this.setState({
      file_form : {
        value   : event.target.files[0], warn : ''
      },
      img_preview : URL.createObjectURL(event.target.files[0])
    }, () => {console.log(this.state)})
  }
  submitFile = () => {
    if(this.state.file_form.value === null){
      this.setState({
        file_form : {
          value : null, warn : 'No file is uploaded'
        }
      })
      return 
    }
    setTimeout(() => {this.setState({file_process : true})}, 1000)
    const load  = new FormData()
    load.append('image', this.state.file_form.value, this.file_form.value.name)
  }
  render(){
    return(
      <section className = 'banjeer-container'>
        <div className = 'banjeer-upload'>
          <div className = 'banjeer-upload-form'>
            <div className = 'banjeer-upload-title'>
              <p>File Upload</p>
            </div>
            <div className = 'banjeer-upload-input'>
              <div className = 'banjeer-upload-file'>
                <input type = 'file' onChange = {this.uploadFile} accept = 'image/*'/>
                <p className = 'warn'>{this.state.file_form.warn}</p>
              </div>
              <div className = 'banjeer-upload-submit'>
                <button onClick = {this.submitFile}>Submit File</button>
              </div>
            </div>
          </div>
          <div className = 'banjeer-prev-title'>
            <p>Preview Image</p>
          </div>
          <div className = 'banjeer-prev-img' key = {this.state.img_preview}>
            <img src = {this.state.img_preview}/>
          </div>
        </div>
        <div className = 'banjeer-container-result'>
          <div className = 'banjeer-result-title'>
            <p>Annotation Result</p>
          </div>
          <div key = {this.state.file_process} className = {`banjeer-result-image ${this.state.file_process ? 'show' : 'hide'}`}>
            <img src = {Annot}/>
          </div>
        </div>
      </section>
    )
  }
}