import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.scss';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" >Pizza</NavigationItem>
        <NavigationItem link="/checkout" >Checkout</NavigationItem>
    </ul>
);

export default navigationItems;