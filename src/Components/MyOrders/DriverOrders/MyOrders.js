import React, { Component } from 'react'
import axios from 'axios'
import MyOrder from './MyOrder/MyOrder'
import { connect } from 'react-redux';
import { error_message } from '../../../store/action'
import { Header } from 'semantic-ui-react';

import { refreshdriver,ChangeBusyDriver } from '../../../store/reducer/actionUser'
import { AllOrdersByDrivers, UpdateDurationOrder } from '../../../store/reducer/actionServer/actionServer'

class myorders extends Component {
    state = {
        orders: [],
        busy: null,
        visited: false,
    }

    UNSAFE_componentWillMount() {
        //return driver after refresh page 
        this.props.refreshpage(sessionStorage.getItem("userId"))

        //return all orders
        this.myorders()
        let driver = { ...this.props.user }
        if (driver) {
            //if stattus active update location driver
            if (driver.Dr_Status) {
                // this.getCurrentLocation();
                if (this.state.visited === false) {
                    //If the driver is busy - updates the order for the duration of the destination 
                    //and checks if it is close to the destination in order to send an sms
                    this.setState({
                        busy: setInterval(x => {
                            driver={ ...this.props.user }
                            if (driver.Dr_Busy) {
                                axios.put(`http://localhost:50130/api/PutUpdateDurationOrder?DriverId=${sessionStorage.getItem("userId")}`).then(x => {
                                }).catch(x => { this.props.error(x.message) })
                            }
                        }, 10000)
                    })
                    this.setState({ visited: true })
                }
                
            }
        }
    }


    //A function that updates a current location
    // getCurrentLocation() {
    //   if (navigator.geolocation) {
    //        navigator.geolocation.watchPosition(position => {
    //         const lat = position.coords.latitude;
    //         const lon = position.coords.longitude;
    //           // alert(lat + ',' + lon);
    //         console.log("Driver");
    //        axios.post(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyD-escEShizSjF9I3GdoO35gMtEuto0FmA
    //       `).then(x => {
    //         alert(JSON.stringify(x))
    //        }).catch(x => {
    //          alert("not good")
    //        });
    //       }, (err)=>{}, {
    //           enableHighAccuracy: true,
    //           maximumAge: 3000,
    //           timeout: 3000
    //       });
    //   }
    // }

    //When leaving a function stop the setinterval
    componentWillUnmount() {
        clearInterval(this.state.busy)

    }

    // Returns all orders placed or awaiting confirmation
    myorders = () => {
        AllOrdersByDrivers().then(x => {
            this.setState({ orders: x })
        }).catch(x => {
            this.props.error(x.message)
        })
    }


    //when the driver does not wants the order  he will go and ask for approval from the next driver
    cancel = (IdOrder) => {
        return axios.put(`http://localhost:50130/api/nextDriver?IdDriver=${sessionStorage.getItem("userId")}&IdOrder=${IdOrder}`).then(x => {
            this.myorders()
        })
    }
   
    render() {


        const order = this.state.orders.map(x => <MyOrder key={x.Ord_Kod} order={x} onclick={this.cancel} ChangeDriver={()=>this.props.ChangeDriver()} />)
        return (
            <div>
                <Header id="header" as='h2' textalign='center'>ההזמנות שלי </Header>
                {this.props.errMas}
                {order}
            </div>
        )
    }
}
const mapDispatcToProps = dispatch => {
    return {
        refreshpage: (Id) => dispatch(refreshdriver(Id)),
        error: (err) => dispatch({ type: error_message, value: err }),
        durationOrder: (Id) => dispatch(UpdateDurationOrder(Id)),
        ChangeDriver:()=>dispatch(ChangeBusyDriver())
    }
}
const mapStateToProps = state => {
    return {
        user: state.user.User,
        errMas: state.user.errorMassge,

    }
}


export default connect(mapStateToProps, mapDispatcToProps)(myorders)

