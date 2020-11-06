import React, { Component } from 'react'
import '../../css/Slide.css'
import { connect } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { withRouter } from "react-router";
class SlideDrawer extends Component {
    render() {
        let drawerClasses = 'side-drawer'
        if (this.props.show) {
            drawerClasses = 'side-drawer open'
        }

        const user = { ...this.props.user }
        let userName;
        const pathname = this.props.history.location.pathname;
        let header = <div></div>
        if (pathname === "/customer/order" || pathname === "/customer/ordertracking" || pathname === "/customer/update" || pathname === "/customer/myorders") {
            userName = user.Cust_FirstName+" "+user.Cust_LastName
            header = <div> <div className="link" id="user" >  {userName}  <i id="icon_user"  className="user circle outline icon"></i> </div>
                <div className="link"><NavLink to="/customer/ordertracking">עקוב אחר ההזמנה</NavLink></div>
                <div className="link"><NavLink to="/customer/update">עדכן פרטים</NavLink></div>
                <div className="link"> <NavLink to="/customer/order">בצע הזמנה</NavLink></div>
                
                <div className="link"><NavLink to="/customer/myorders">ההזמנות שלי</NavLink></div>
                <div className="link"> <NavLink to="/customer/logout">התנתק <i  className="sign-out icon"></i></NavLink></div>
            </div>
        }
        else
            if ((pathname === "/customer/login" || pathname === "/driver/login" || pathname === "/customer/signup" || pathname === "/driver/signup"))
                header = <div>  <div className="link"><NavLink exact to='/customer'>היכנס כלקוח</NavLink></div>
                    <div className="link"> <NavLink exact to='/driver'>היכנס כנהג</NavLink></div></div>
            else
                if (pathname === "/driver/update" || pathname === "/driver/myorders") {
                    userName = user.Dr_FirstName+" "+user.Dr_LastName
                    header = <div>
                        <div className="link" id="user" >    {userName} <i id="icon_user" className="user circle outline icon"></i></div>
                        <div className="link"> <NavLink to="/driver/myorders">ההזמנות שלי</NavLink>  </div>
                        <div className="link"> <NavLink to="/driver/update">עדכן פרטים</NavLink>     </div>
                        <div className="link"> <NavLink to="/driver/logout">התנתק <i  className="sign-out  icon"></i></NavLink>          </div>
                    </div>
                }
                else
                    if (pathname === "/") {
                        //Checks the type of user so that he does not enter the main page every time
                        if (localStorage.getItem('UserType'))
                            if (localStorage.getItem('UserType') === "customer")
                                header = <Redirect path="/" to="/customer" />
                            else
                                header = <Redirect path="/" to="/driver" />
                        else
                            header = <div>  <div className="link"><NavLink exact to='/customer'>היכנס כלקוח</NavLink></div>
                                <div className="link"> <NavLink exact to='/driver'>היכנס כנהג</NavLink></div></div>
                    }
        return (

            <div className={drawerClasses} >
               
                {header}
            </div>
        )
    }

}
const mapStateToProps = state => {
    return {
        user: state.user.User

    }
}
export default withRouter(connect(mapStateToProps)(SlideDrawer));
