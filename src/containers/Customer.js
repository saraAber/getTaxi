import React, { Component } from 'react'
import Login from '../Components/Login/Login'
import SignupCustomer from '../Components/Signups/SignupCustomer/SignupCustomer'
import { Switch, Route, Redirect } from 'react-router-dom/cjs/react-router-dom';
import { connect } from 'react-redux';
import Update from '../Components/Updates/UpdateCustomer/UpdateCustomer'
import Orders from '../Components/Orders/Orders'
import Logout from '../Components/Logout/Logout'
import { pathuser } from '../store/reducer/actionUser'
import MyOrders from '../Components/MyOrders/CustomerOrders/MyOrders'
import Tracking from '../Components/Tracking/Tracking'
class customer extends Component {
     UNSAFE_componentWillMount() {
          this.props.userpath("/customer")
     }
     render() {
          return (<div>
                    <Switch>
                         <Route path="/customer/login" component={Login} />
                         <Route path="/customer/signup" component={SignupCustomer} />
                         <Route path="/customer/order" component={Orders} />
                         <Route path="/customer/myorders" component={MyOrders} />
                         <Route path="/customer/update" component={Update} />
                         <Route path="/customer/ordertracking" component={Tracking} />
                         <Route path='/customer/logout' component={Logout} />
                         <Redirect path="/customer" to="/customer/login" />

                    </Switch>
               </div>
          )
     }
}
const mapDispatcToProps = dispatch => {
     return {
          userpath: (user) => dispatch(pathuser(user))
     }
}

export default connect(null, mapDispatcToProps)(customer)
