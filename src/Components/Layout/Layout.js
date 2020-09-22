import React from 'react';
// import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Header from '../Header/Header'
const layout = (props) => (
    // <Aux>
    <div>
        <div className={classes.Layout}><Header login="true"></Header></div>
        <main>
            {props.children}
        </main>
        <div>footer</div>
        </div>
    // </Aux>
);

export default layout;