import React, { Fragment, Component } from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import classes from './Layout.scss';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    showSideDrawerHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggler = () => {
        this.setState({ showSideDrawer: true });
    }

    render() {
        return (
            <Fragment>
                <SideDrawer open={this.showSideDrawerHandler} show={this.state.showSideDrawer} />
                <Toolbar toggle={this.sideDrawerToggler} />
                <main className={classes.layout} >
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
}

export default Layout;