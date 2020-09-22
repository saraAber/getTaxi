import React, { Component } from 'react';
import Customer from './Customer'
import Driver from './Driver'
import Header from '../Components/Header/Header'
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom';
class ticktackBuilder extends Component {

  
    render() {
        return (
            <div>  
               
                <Header {...this.props} />
                <Switch>
                    <Route path='/customer' component={Customer} />
                    <Route path='/driver' component={Driver} />            
                </Switch>
            </div>
        )
    }
}

export default ticktackBuilder;