import React, { Component } from 'react'
import { Button, Rating } from 'semantic-ui-react';
import { CustomerOrder, StatusOrder } from '../../../../store/reducer/actionServer/actionServer'
import '../../../../css/DriverOrders.css';

class myorder extends Component {
    state = {
        disabled: false,
        title: null,
        text: null,
        cancelButton: null,
        nameCustomer: null,
        phoneCustomer: null,
        floorCustomer: null,
        pointCustomer: 0
    }
    //Returns customer for each order and update the state
    UNSAFE_componentWillMount() {
        const order = { ...this.props.order }
        CustomerOrder(order.Cust_send).then(x => {

            this.setState({
                pointCustomer: x.Cust_Points>5?5:x.Cust_Points,
                nameCustomer: x.Cust_FirstName + " " + x.Cust_LastName,
                phoneCustomer: x.Cust_PhoneNumber,
                floorCustomer: x.Cust_Floor
            })
        })
        //Initializes the order status
        switch (order.Ord_Stattus) {
            case 1:
                {
                    this.setState({ title: "  קבל" })
                    this.setState({ cancelButton: <Button id="button_x" type="submit" onClick={() => this.props.onclick(order.Ord_Kod)} >  דחה</Button> })
                    this.setState({ text: 1 })
                    break;
                }
            case 2:
                {
                    this.setState({ title: "לקחתי חבילה" })
                    this.setState({ text: 2 })
                    break;
                }
            case 3: {
                this.setState({ title: "הגיעה ליעד" })
                this.setState({ text: 3 })
                break;
            }
            case 4: {
                this.setState({ title: "הגיעה ליעד" })
                this.setState({ text: 4 })
                this.setState({ disabled: true })
                break;
            }
            default: {
                break;
            }
        }
    }
    //When you click the button the status will change
    switchcasebutton = () => {
        const number = this.state.text;
        let title
        switch (number) {
            case 2:
                {
                    this.setState({ cancelButton: null })
                    title = "לקחתי חבילה"
                    break;
                }
            case 3: {
                title = "הגיעה ליעד"
                break;
            }
            default: {
                title = "הגיעה ליעד"
                this.setState({ disabled: true })
                break;
            }
        }
        

        return title
      

    }
    //When you click the button the status will change in the data
    switchcaseServer = () => {
        const number = this.state.text;
        let order = { ...this.props.order }
        switch (number) {
            case 2:
                {

                    order.Ord_Stattus = 2
                    order.Ord_Id_driver = sessionStorage.getItem("userId")
                 
                    this.props.ChangeDriver()
                    
                    break;
                }
            case 3:
                {
                    order.Ord_Stattus = 3
                    break;
                }
            case 4:
                {

                    order.Ord_Stattus = 4
                    this.props.ChangeDriver()
                    break;
                }
            default:
                break;
        }

        StatusOrder(order);
        
        
    }
    //onclick button enter to this function
    onclick = () => {
        this.setState({ text: this.state.text + 1 },
            () => this.setState({ title: this.switchcasebutton() },
                () => this.switchcaseServer()))
          
    }

    render() {

        return (
            <div>
                {this.state.pointCustomer !== 0 ?
                    <div className="Driverorders">
                     
                        <div id="source_address"><i id="icon_from"  className="map marker alternate icon"></i> <b>איסוף- </b>{this.props.order.Cust_sourceAddress} <b>  קומה </b> {this.state.floorCustomer}</div>
                     
                        <div><i id="icon_to" className="map marker alternate icon"></i> <b>מסירה- </b> {this.props.order.Cust_DesAddress} <b> קומה, </b>{this.props.order.Cust_getfloor}</div>

                        <div><b>שם לקוח: </b>{this.state.nameCustomer}</div>
                        <div><b>מספר טלפון לקוח: </b>{this.state.phoneCustomer}</div>
                        <div className="">לקוח ותיק <Rating defaultRating={this.state.pointCustomer} maxRating="5" disabled /> </div>
                        <div><b>שם נמען:</b> {this.props.order.Cust_getName}</div>
                        <div><b>מספר טלפון נמען: </b>{this.props.order.Cust_getPhone}</div>
                        <div className="center">
                        <Button id="button_v" type="submit" disabled={this.state.disabled} onClick={this.onclick} >{this.state.title}</Button>
                        {this.state.cancelButton}
                        </div> 
                    </div> : null}</div>
        )
    }
}
export default myorder