import React, { Component } from 'react'
import MyOrder from './MyOrder/MyOrder'
import { connect } from 'react-redux';
import {AllOrders} from '../../../store/reducer/actionServer/actionServer'
import { refreshcustomer } from '../../../store/reducer/actionUser'
import {error_message} from '../../../store/action'
import {Header} from 'semantic-ui-react';

class myorders extends Component {
    state = {
        orders: []
    }

    UNSAFE_componentWillMount() {
        //return customer after refresh page 
         this.props.refreshpage(sessionStorage.getItem("userId"))
         //Returns all orders placed by the customer
            AllOrders().then(x=>{
            this.setState({ orders: x })}).catch(x=>{
                this.props.error(x.message)
            })

    }
    render() {
        const order = this.state.orders.map(x => <MyOrder key={x.Ord_Kod} order={x} />)
        return (
            <div>
                  <Header id="header" as='h2'  textalign='center'>ההזמנות שלי </Header>       

                {this.props.errMas}
                {order}
            </div>
        )
    }
}
const mapDispatcToProps = dispatch => {
    return {
        refreshpage: (Id) => dispatch(refreshcustomer(Id)),
        error:(err) => dispatch({type:error_message , value: err })
    }
}
const mapStateToProps = state => {
    return {
        errMas: state.user.errorMassge
    }
}
export default connect(mapStateToProps, mapDispatcToProps)(myorders)
