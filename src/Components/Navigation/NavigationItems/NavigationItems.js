import React from 'react';
import { connect } from 'react-redux';
import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.scss';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact >Pizza</NavigationItem>
        {props.isAuth ? <NavigationItem link="/orders" >Orders</NavigationItem> : null}
        {props.isAuth ? <NavigationItem link="/logout" >Logout</NavigationItem> : <NavigationItem link="/auth" >Authenticate</NavigationItem>}
    </ul>
);

const mapStateToProps = state => {
    return {
        isAuth: state.auth.idToken
    }
}

export default connect(mapStateToProps)(navigationItems);