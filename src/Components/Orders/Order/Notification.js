import React, { Component } from "react";

class SimpleNotification extends Component {
  constructor() {
    super();
    this.showNotification = this.showNotification.bind(this);
  }
  
  state={name:"שים לב!!"}

  componentDidMount() {
    Notification.requestPermission();
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else {
      Notification.requestPermission();
    }
  }

  showNotification=()=> {
    var options = {
      body: "שלום מחכה לך הזמנה ",
      icon: "https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?    auto=compress&cs=tinysrgb&dpr=1&w=500",
      dir: "rtl"
    };
     var notification = new Notification("בקשת הזמנה", options);      
    notification.onclick = function() {
     window.open('http://localhost:3000/driver/myorders');
   } 
  }
  componentWillMount() {
    this.showNotification()
  }
  render() {
    return (
      <div>

      </div>
    );
  }
}

export default SimpleNotification;