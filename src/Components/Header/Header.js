import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { withRouter } from "react-router";
import SlideDrawer from './Slide.js'
//const SlideDrawer=lazy(()=>import(from ('./Slide.js')));
import Backdrop from './Backdrop.js'
import '../../css/Header.css'


class header extends Component {
    state = { drawerOpen: false }
    drawerToggleClickHandler = () => {
        this.setState({
            drawerOpen: !this.state.drawerOpen
        })
    }
    backdropClickHandler = () => {
        this.setState({
            drawerOpen: false
        })
    }

    render() {
        const user = { ...this.props.user }
        let userName;


        const pathname = this.props.history.location.pathname;
        let links = <div></div>
        let logo = <div> </div>
        let hello = <div></div>
        if (pathname === "/") {
            links = <div >  <div className="link_cu" ><NavLink exact to='/customer'>היכנס כלקוח</NavLink></div>
                <div className="link_dr"> <NavLink exact to='/driver'>היכנס כנהג</NavLink></div></div>
            logo = <div id="ticktack"></div>
        }
        if (pathname === "/driver/update" || pathname === "/driver/myorders") {
            userName = user.Dr_FirstName
            hello = <div id="hello_to"> היי {userName}</div>;
        }
        else if (pathname === "/customer/order" || pathname === "/customer/ordertracking" || pathname === "/customer/update" || pathname === "/customer/myorders") {
            userName = user.Cust_FirstName
            hello = <div id="hello_to"> היי {userName}</div>;
        }


        let backdrop;
        if (this.state.drawerOpen) {
            backdrop = <Backdrop close={this.backdropClickHandler} />;
        }



        return (<nav className="nav">

            <div>
                <div>
                    < SlideDrawer show={this.state.drawerOpen} />

                    {backdrop}

                </div>

                <button id="button_menu" onClick={this.drawerToggleClickHandler}>  <i id="icon_menu" className="sidebar icon"></i> </button>
                {hello}
                {links}
                {logo}
            </div></nav>)
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.User

    }
}
export default withRouter(connect(mapStateToProps)(header));