import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.scss';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact >Pizza</NavigationItem>
        <NavigationItem link="/orders" >Orders</NavigationItem>
        <NavigationItem link="/auth" >Authenticate</NavigationItem>
    </ul>
);

export default navigationItems;