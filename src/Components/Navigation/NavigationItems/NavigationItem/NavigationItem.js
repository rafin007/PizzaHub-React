import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.scss';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink to={props.link} activeClassName={classes.active} exact={props.exact} >
            {props.children}
        </NavLink>
    </li>
);

export default navigationItem;