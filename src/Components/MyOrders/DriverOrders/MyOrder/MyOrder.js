import React, { Component } from 'react'
import { Button, Rating } from 'semantic-ui-react';
import { CustomerOrder, ChangeBusyDriver, StatusOrder } from '../../../../store/reducer/actionServer/actionServer'


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
    componentWillMount() {
        const order = { ...this.props.order }
        CustomerOrder(order.Cust_send).then(x => {
            this.setState({
                pointCustomer: x.Cust_Points,
                nameCustomer: x.Cust_FirstName + " " + x.Cust_LastName,
                phoneCustomer: x.Cust_PhoneNumber,
                floorCustomer: x.Cust_Floor
            })
        })
        //Initializes the order status
        switch (order.Ord_Stattus) {
            case 1:
                {
                    this.setState({ title: "הזמנה ממתינה לאישורך" })
                    this.setState({ cancelButton: <Button type="submit" onClick={() => this.props.onclick(order.Ord_Kod)} >איני מעוניין</Button> })
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
                this.setState({ title: "הזמנה הגיעה ליעדה" })
                this.setState({ text: 3 })
                break;
            }
            case 4: {
                this.setState({ title: "הזמנה הגיעה ליעדה" })
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
       const number=this.state.text;
        let title
        switch (number) {
            case 2:
                {
                    this.setState({ cancelButton: null })
                    title = "לקחתי חבילה"
                    break;
                }
            case 3: {
                title = "הזמנה הגיעה ליעדה"
                break;
            }
            default: {
                title = "הזמנה הגיעה ליעדה"
                this.setState({ disabled: true })
                break;
            }
        }
        // this.state.title = title

        return title
        // this.state.text = number
        // this.setState({ text: number })

    }
    //When you click the button the status will change in the data
    switchcaseServer = () => {
      const  number=this.state.text;
      console.log(number)
        let order = { ...this.props.order }
        switch (number) {
            case 2:
                {
                    order.Ord_Stattus = 2
                    order.Ord_Id_driver = sessionStorage.getItem("userId")
                    ChangeBusyDriver()
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
                    ChangeBusyDriver()
                    break;
                }
            default:
                break;
        }

        StatusOrder(order)
    }
    //onclick button enter to this function
    onclick = () => {
        this.setState({text: this.state.text + 1},
            ()=>this.setState({title: this.switchcasebutton()},
            ()=>this.switchcaseServer()))           
    }

    render() {
        return (
            <div>
                {this.state.pointCustomer !== 0 ?
                    <div>
                        <div> <Rating defaultRating={this.state.pointCustomer} maxRating="5" disabled /> דירוג לקוח</div>
                        <div>שם לקוח {this.state.nameCustomer}</div>
                        <div>כתובת לקיחה {this.props.order.Cust_sourceAddress}</div>
                        <div>קומה {this.state.floorCustomer}</div>
                        <div>מספר טלפון לקוח {this.state.phoneCustomer}</div>
                        <div>שם נמען {this.props.order.Cust_getName}</div>
                        <div>כתובת ייעד {this.props.order.Cust_DesAddress}</div>
                        <div>קומה {this.props.order.Cust_getfloor}</div>
                        <div>מספר טלפון נמען {this.props.order.Cust_getPhone}</div>
                        <Button type="submit" disabled={this.state.disabled} onClick={this.onclick} >{this.state.title}</Button>
                        {this.state.cancelButton}
                    </div> : null}</div>
        )
    }
}
export default myorder