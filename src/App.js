import React, { Component } from 'react';
import TickTackBuilder from './containers/TickTackBuilder';
import { Router } from "react-router-dom";
import history from "./containers/his";
import './App.css'
class App extends Component {
 
  render() {

    return (
      <Router history={history}>
      <div>
        <TickTackBuilder  />
      </div></Router>
    );
  }
}
export default App;

