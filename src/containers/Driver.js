import React, { Component } from 'react'
import Login from '../Components/Login/Login'
import SignupDriver from '../Components/Signups/SignupDriver/SignupDriver'
import UpdateDriver from '../Components/Updates/UpdateDriver/UpdateDriver'
import { Switch, Route, Redirect } from 'react-router-dom/cjs/react-router-dom';
import { connect } from 'react-redux';
import MyOrders from '../Components/MyOrders/DriverOrders/MyOrders'
import Logout from '../Components/Logout/Logout'
import {pathuser} from '../store/reducer/actionUser'
class driver extends Component {
  UNSAFE_componentWillMount() {
    this.props.userpath("/driver")
   
  }
  render() {
    return (
      <div>
        <Switch>
          <Route path="/driver/login" component={Login} />
          <Route path="/driver/signup" component={SignupDriver} />
          <Route path="/driver/update" component={UpdateDriver}/>
          <Route path="/driver/myorders" component={MyOrders}/>
          <Route path='/driver/logout' component={Logout} />
          <Redirect path="/driver" to="/driver/login" />
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
export default connect(null, mapDispatcToProps)(driver)
