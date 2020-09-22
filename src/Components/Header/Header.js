import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { withRouter } from "react-router";
import classes  from './Header.css';
import '../Header/Header'


class header extends Component {
    render() {

        const user = { ...this.props.user }
        let userName;
        const pathname = this.props.history.location.pathname;
        let header =<div className="header_up"></div>

        if (pathname === "/customer/order" || pathname === "/customer/ordertracking" || pathname === "/customer/update" || pathname === "/customer/myorders") {
            userName = user.Cust_FirstName
            header = <div className="header_up" > 
            <NavLink to="/customer/ordertracking" >Order Tracking</NavLink>
            <NavLink to="/customer/update">Update details</NavLink>
            <NavLink to="/customer/order" >Order</NavLink>
            <NavLink className="log_out" to="/customer/logout" >Log Out</NavLink>
            <NavLink  to="/customer/myorders">My Orders</NavLink>
            <h1 >שלום {userName}</h1>
            </div>
        }
        else
            if ((pathname === "/customer/login" || pathname === "/driver/login" || pathname === "/customer/signup" || pathname === "/driver/signup"))
            header = <ul><li><NavLink exact to='/customer'>היכנס כלקוח</NavLink></li>
            <li><NavLink exact to='/driver'>היכנס כנהג</NavLink></li></ul>
            else
                if (pathname === "/driver/update"||pathname==="/driver/myorders") {
                    userName = user.Dr_FirstName
                    header = <div className="header_up"> 
                    <NavLink to="/driver/myorders">My Orders</NavLink>
                    <NavLink to="/driver/update">Update Details</NavLink>
                    <NavLink className="log_out" to="/driver/logout">Log Out</NavLink>
                    <h1 >שלום {userName}</h1>  </div>
                }
                else
                    if (pathname === "/") {
                        //Checks the type of user so that he does not enter the main page every time
                        if (localStorage.getItem('UserType'))
                            if (localStorage.getItem('UserType') === "customer")
                                header = <div className="header_up">
                                <Redirect path="/" to="/customer" />   </div>
                            else
                                header = <div className="header_up">
                                <Redirect path="/" to="/driver" />   </div>
                        else
                            header = <div className="header_up">
                            <NavLink exact to='/customer'>היכנס כלקוח</NavLink>
                            <NavLink exact to='/driver' >היכנס כנהג</NavLink>   </div>
                    }


        return (<nav> {header}</nav>)
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.User

    }
}
export default withRouter(connect(mapStateToProps)(header));