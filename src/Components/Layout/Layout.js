import React, { Fragment } from 'react';
import classes from './Layout.scss';

const layout = (props) => {
    return (
        <Fragment>
            <div>Toolbar, sidebar, backdrop</div>
            <main className={classes.layout} >
                {props.children}
            </main>
        </Fragment>
    );
}

export default layout;