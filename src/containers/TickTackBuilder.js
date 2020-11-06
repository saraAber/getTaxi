import React, { Component } from 'react';
import Customer from './Customer'
import Driver from './Driver'
import Header from '../Components/Header/Header'
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/ticktuckbuilder.css'
class ticktackBuilder extends Component { 
    render() {
       
        return (
            <div >                 
                <Header {...this.props} />
                <Switch>
                    <Route path='/customer' component={Customer} />
                    <Route path='/driver' component={Driver}  />            
                </Switch>
                <ToastContainer outoClose={2000} hideProgressBar />


            </div>
        )
    }
}

export default ticktackBuilder;