import React from 'react';
import classes from './Layout.css';
import Header from '../Header/Header'
const layout = (props) => (
    <div>
        <div className={classes.Layout}><Header login="true"></Header></div>
        <main>
            {props.children}
        </main>
        <div>footer</div>
        </div>

);

export default layout;