import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';

import Logo from '../../Logo/Logo';
import classes from './Toolbar.scss';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div onClick={props.toggle} className={classes.Menu} >
            <div className={classes.Menu__icon} >&nbsp;</div>
        </div>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;