
import React, { Component } from 'react'
import { Button } from 'semantic-ui-react';
import './Image.css'
import 'semantic-ui-css/semantic.min.css';


class Upload extends Component {
  constructor(props){
    super(props)
    this.state = {
      img:false,
      file: null
    }
    this.fileChangedHandler = this.fileChangedHandler.bind(this)
  }

   // this.state.file=URL.createObjectURL(event.target.files[0]).toString();
   
  fileChangedHandler = (event) => {
    try {
      this.setState({
        file:URL.createObjectURL(event.target.files[0]).toString(),
        img:true
       
      })
     this.props.src((event.target.files[0]).toString())
      
    }
     catch (error) {
      console.log("error "+error)
      
    }
  
    console.log("file"+this.state.file)

  }

  render() {
  
    return (
      <div className="image">
        <input type="file"  onChange={this.fileChangedHandler} style={{display:"none"}} ref={fileInput=>this.fileInput=fileInput}/>
        <Button type="button" onClick={()=>this.fileInput.click()}>בחר תמונה</Button>
      {this.state.img?<img src={this.state.file} alt="alt"  style={{"height":80, "width":60, "borderRadius": 50,
    "margin-left": "5vw"}} />:null}
      </div>
    );
  }
}
export default Upload