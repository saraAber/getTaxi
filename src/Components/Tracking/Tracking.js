import React, { Component } from 'react'
import { Button, Input} from 'semantic-ui-react';
import axios from 'axios'

class Tracking extends Component {
  state = {
    order_kod: null,
    duration:null,
    message:""
  }
 //update the state in the value
  inputChange = (event) => {
    var value=null;
    value=event.target.value;
     this.setState({ order_kod: value});
  }

  //when the user clicks he enters this function and returns in how long the order will reach its destination
  submit = () => { 
    const data = {
      order_kod: this.state.order_kod
    }
    axios.get(`http://localhost:50130/api/MyOrderTrack?Kod=${data.order_kod}`).then(x => {
      this.setState({ duration: x.data });  
    this.setState({message: "דקות "})
  }).catch(err=>{
    this.setState({message: err.response.data.Message})
  })
  }

  render() {
    return (<div>
      <div>מעקב הזמנה</div>
      <Input placeholder="הזן קוד הזמנה" onChange={(event) => this.inputChange(event) } ></Input>

      <Button onClick={(event) => this.submit(event) } type="submit" >לחץ כאן למעקב</Button>
    <div >{this.state.message}{this.state.duration}</div>

    </div>
    )
  }
}


export default Tracking;


