import React, { Component } from 'react'
import { Rating } from 'semantic-ui-react'
import Time from 'react-time';
import {driversrating,DriverOrder} from '../../../../store/reducer/actionServer/actionServer'
import '../../../../css/DriverOrders.css';
class myorder extends Component {
  state = {
    title: null,
    DriverName: null,
    DriverPhone: null,
    PointDriver: 0
  }
  //Updates the driver's rating by a customer to order
  handleRate = (e, { rating, maxRating }) => {
    this.setState({ rating, maxRating }, () => {
      const order = { ...this.props.order }
      driversrating(order.Ord_Kod,this.state.rating)   
    })
  }
  UNSAFE_componentWillMount() {
    const order = { ...this.props.order }
    //Returns driver for each order and update the state
    if (order.Ord_Id_driver !== null) {
      DriverOrder(order.Ord_Id_driver).then(x=>{
        this.setState({ DriverName: x.Dr_FirstName + " " + x.Dr_LastName, DriverPhone: x.Dr_Phone_number })
      }).catch()
    }
    this.setState({ PointDriver: order.Dr_Points })
    //Initializes the order status
    let title
    switch (order.Ord_Stattus) {
      case 1:

         title= "הזמנה ממתינה לאישור נהג" 
        break;
      case 2:
        title= "נהג בדרך אליך..."
        break;
      case 3:
        title= "הזמנה נלקחה מכתובת האיסוף"
        break;
      case 4:
        title= "הזמנה הגיעה ליעדה"
        break;
      default:
        {
       title= "לא נמצא להזמנה נהג מתאים" 
          break;
        }
    }
    this.setState({title:title})
  }

  render() {
    let driver = null
    this.state.DriverName !== null && this.state.DriverPhone !== null ? driver = <div> <div><b>שם נהג :</b> {this.state.DriverName}</div><div><b>טלפון נהג :</b> {this.state.DriverPhone}</div></div>
      : driver = null

    return (
      <div className="Customerorders">
   
        <div>  
        <Time value={this.props.order.Ord_OrderTime} format="DD/MM/YYYY" />  
         {"\t\t\t\t\t\t"}
         <Time value={this.props.order.Ord_OrderTime} format="HH:mm" />
         </div>
        <div><b> איסוף- </b>{this.props.order.Cust_sourceAddress}</div>
        <div><b> מסירה- </b>{this.props.order.Cust_DesAddress} <b> קומה </b>{this.props.order.Cust_getfloor}</div>
        <div><b>שם נמען :</b>{this.props.order.Cust_getName}</div>
        <div><b> טלפון נמען :</b>{this.props.order.Cust_getPhone}</div>
       
      
      
        {driver}
        <div id="title">{this.state.title}</div>
        <div className="rating"><b>  דרג נהג <i  className="hand point left outline icon"></i>  </b><Rating maxRating={5} defaultRating={this.state.PointDriver} onRate={this.handleRate} /></div>
      
        <div className="num_order">{this.props.order.Ord_Kod}</div> 
      </div>
    )
  }
}

export default myorder
