import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.scss';

const navigationItems = (props) => {

    let routes = (
        <Fragment>
            <NavigationItem link="/signin" >Sign In</NavigationItem>
            <NavigationItem link="/signup" >Sign Up</NavigationItem>
        </Fragment>
    );
    if (props.isAuth) {
        routes = <NavigationItem link="/logout" >Logout</NavigationItem>;
    }

    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact >Pizza</NavigationItem>
            {props.isAuth ? <NavigationItem link="/orders" >Orders</NavigationItem> : null}
            {routes}
        </ul>
    );
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.idToken
    }
}

export default connect(mapStateToProps)(navigationItems);