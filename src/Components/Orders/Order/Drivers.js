import { Button, Confirm } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { orderfunc } from '../../../store/reducer/actionOrder'
import { refreshcustomer } from '../../../store/reducer/actionUser'
import Driver from './Driver'
import axios from 'axios'
import { OrderConfirmed } from '../../../store/reducer/actionOrder'
import React, { Component } from 'react'
import { error_message } from '../../../store/action'
//import * as signalR from "@microsoft/signalr";

class ModalExampleTopAligned extends Component {
    // constructor(){
    //     super()
    //     this.hubConnection=this.hubConnectio.bind(this)

    // }
    state = {
        open: false,
        setOpen: false,
        SelectedDriver: null,
        loading: "ממתין לאישור נהג",
        disabled: false,
        inteval: false
    }
    checked = (Id) => {
        //  console.log(this.state.hubConnection)
        // this.hubConnection.invoke("Driver", "1", "Helow")
        const Order = { ...this.props.order };
        axios.put(`http://localhost:50130/api/DriverToOrder?IdDriver=${Id}&IdOrder=${Order.Ord_Kod}`).then(x => {
        })
    }




    componentWillMount() {
        this.props.error("")
        //     this.hubConnection = new signalR.HubConnectionBuilder()
        //         .withUrl("/signalr")
        //         .configureLogging(signalR.LogLevel.Information)
        //         .build();

        //     // Starts the SignalR connection
        //     this.hubConnection.start().then(a => {
        //         // Once started, invokes the sendConnectionId in our ChatHub inside our ASP.NET Core application.
        //         if (this.hubConnection.connectionId) {
        //             this.hubConnection.invoke("Join", "1");
        //         }
        //     });

        //     this.hubConnection.on("SendToDriver", message => {
        //         //
        //     });
        //   //this.setState({hubConnection:hubConnection})
    }
    show = () => this.setState({ open: true })
    handleConfirm = () => this.setState({ open: false })
    handleCancel = () => this.setState({ open: false })
    IsOrderConfirmed = () => {
        this.setState({ disabled: true })
        const order = { ...this.props.order }
        this.setState({
            inteval: setInterval(x => {
                this.props.orderconfirmed(order.Ord_Kod)
            }, 10000)
        })

    }

    render() {
        if (this.props.errMas !== "" && this.state.loading !== this.props.errMas) {
            this.setState({ loading: this.props.errMas })
            if (this.props.errMas !== "ממתין לאישור נהג")
                clearInterval(this.state.inteval)
        }
        let driver = null;

        if (this.props.allDrivers.length !== 0) {
            const Drivers = [];
            for (let item in this.props.allDrivers) {
                Drivers.push({ id: item, config: this.props.allDrivers[item] })
            }
            driver = Drivers.map(x => <Driver key={x.id} driver={x.config} disabled={this.state.disabled} checked={this.checked} active={this.props.errMas === "ההזמנה אושרה" ? false : true} value={this.state.loading} orderconfirmed={this.IsOrderConfirmed} />)

        }
        else {
            driver = this.props.errMas
        }
        return (
            <div>
                <Button onClick={this.show}>{this.props.value}</Button>
                <Confirm
                    open={this.state.open}
                    content={driver}
                    header="בחר נהג"
                    cancelButton={false}
                    confirmButton={false}
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        allDrivers: state.order.Drivers,
        order: state.order.order,
        errMas: state.user.errorMassge
    }
}
const mapDispatcToProps = dispatch => {
    return {
        orders: (order) => dispatch(orderfunc(order)),
        refreshpage: (Id) => dispatch(refreshcustomer(Id)),
        orderconfirmed: (Id) => dispatch(OrderConfirmed(Id)),
        error: (err) => dispatch({ type: error_message, value: err }),
    }
}
export default connect(mapStateToProps, mapDispatcToProps)(ModalExampleTopAligned)