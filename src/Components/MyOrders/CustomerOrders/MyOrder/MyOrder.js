import React, { Component } from 'react'
import { Rating } from 'semantic-ui-react'
import Time from 'react-time';
import {driversrating,DriverOrder} from '../../../../store/reducer/actionServer/actionServer'
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
  componentWillMount() {
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
        title= "נהג בדרך אליך"
        break;
      case 3:
        title= "הזמנה נלקחה מכתובת האיסוף"
        break;
      case 4:
        title= "הזמנה הגיעה לייעדה"
        break;
      default:
        {
       title= "לא נמצאה להזמנה נהג מתאים" 
          break;
        }
    }
    this.setState({title:title})
  }

  render() {
    let driver = null
    this.state.DriverName !== null && this.state.DriverPhone !== null ? driver = <div> <div>שם נהג {this.state.DriverName}</div><div>טלפון נהג {this.state.DriverPhone}</div></div>
      : driver = null

    return (
      <div>
        <div>מספר הזמנה {this.props.order.Ord_Kod} </div>
        <div> תאריך בצוע ההזמנה      
        <Time value={this.props.order.Ord_OrderTime} format="DD/MM/YYYY" />  
         {"\t\t\t\t\t\t"}
         <Time value={this.props.order.Ord_OrderTime} format="HH:mm" />
         </div>
        <div>כתובת לקיחה {this.props.order.Cust_sourceAddress}</div>
        <div>שם נמען {this.props.order.Cust_getName}</div>
        <div>כתובת ייעד {this.props.order.Cust_DesAddress}</div>
        <div>קומה {this.props.order.Cust_getfloor}</div>
        <div>מספר טלפון נמען {this.props.order.Cust_getPhone}</div>
        {driver}
        <div><Rating maxRating={5} defaultRating={this.state.PointDriver} onRate={this.handleRate} />דרג נהג</div>
        <div>{this.state.title}</div>
      </div>
    )
  }
}

export default myorder
