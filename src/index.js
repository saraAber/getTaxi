import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import  thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {createStore,combineReducers, applyMiddleware} from 'redux'
import rootReducer from './store/reducer/reducerUser'
import reducerOrder from './store/reducer/reducerOrder'

const combin=combineReducers({
    user:rootReducer,
    order:reducerOrder
    
})
const store=createStore(combin,applyMiddleware(thunk));
ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
    <App/>
    </BrowserRouter> 
    </Provider>,
document.getElementById('root'));

