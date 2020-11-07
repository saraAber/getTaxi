import React, { Component } from 'react'
import { Button, Input, Header } from 'semantic-ui-react';
import axios from 'axios'
import GoogleMapReact from 'google-map-react';
import '../../css/Tracking.css'

const AnyReactComponent = ({ text }) =>  <div id="text" >{text}</div>;

class Tracking extends Component {
  state = {
    order_kod: null,
    duration: null,
    lat: null,
    lon: null,
    message: "",
    message1: "",
    class_text:"",
    center: {
      
      lat: 32.087220,
      lng: 34.844680
    },
   

  }

  static defaultProps = {
    center: {
      
      lat: 32.087220,
      lng: 34.844680
    },
    zoom: 17
  };
  
  //update the state in the value
  inputChange = (event) => {
    var value = null;
    value = event.target.value;
    this.setState({ order_kod: value });
  }
 

  //when the user clicks he enters this function and returns in how long the order will reach its destination
  submit = () => {
    const data = {
      order_kod: this.state.order_kod
    }

    axios.get(`http://localhost:83/api/MyOrderTrack?Kod=${data.order_kod}`).then(x => {
      this.setState({ duration: x.data.DurationDestination });
    
      this.setState({ lat: x.data.lat });
      this.setState({ lon: x.data.lon });
      this.setState({ message: " דקות " })
      this.setState({ message1: "משלוחן יגיע ליעד בעוד כ- " })
      this.setState({
        center: {lat: x.data.lat, lng: x.data.lon }
    },()=>console.log(this.state.center));
    }).catch(err => { 
      this.setState({ message: err.response.data.Message ,message1:"",duration:null})
    })
  }

  render() {
  
    let icon = <i className="map marker alternate icon"></i>
    return (<div>
      <Header id="header" as='h2' textalign='center'>
        מעקב הזמנה
          </Header>
      <div id="track">
        <Input placeholder="הזן קוד הזמנה" onChange={(event) => this.inputChange(event)} ></Input>

        <Button onClick={(event) => this.submit(event)} type="submit" >לחץ כאן למעקב</Button>
      </div>

      <div id="msg">{this.state.message1}{this.state.duration}{this.state.message}</div>

      
      <div id="map_tracking">

        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyD-escEShizSjF9I3GdoO35gMtEuto0FmA" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          initialCenter={{
            lat: this.state.lat,
            lng: this.state.lon
          }}
        >
          <AnyReactComponent
            lat={this.state.lat}
            lng={this.state.lon}
            text={icon}
            
          />
        </GoogleMapReact>
      </div>

    </div>
    )
  }
}


export default Tracking;


