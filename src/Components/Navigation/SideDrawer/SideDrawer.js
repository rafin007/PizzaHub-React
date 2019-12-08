import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Logo from '../../Logo/Logo';

import Heart from '../../../assets/SVG/heart.svg';

import classes from './SideDrawer.scss';

const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close];

    if (props.show) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Fragment>
            <BackDrop show={props.show} clicked={props.open} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.items}>
                    <div className={classes.Logo}>
                        <NavLink to="/" >
                            <Logo />
                        </NavLink>
                    </div>
                    <nav>
                        <NavigationItems />
                    </nav>
                </div>
                <p className={classes.Credit__text}>Built with <img src={Heart} alt="Heart" className={classes.Credit__text__heart} /> by Arefin.</p>
            </div>
        </Fragment>
    );
}

export default sideDrawer;