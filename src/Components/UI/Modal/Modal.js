import React, { Fragment } from 'react';
import classes from './Modal.scss';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {

    const specialClass = [classes.Modal];

    if (props.show) {
        specialClass.push(classes.Modal_show);
    }
    else {
        specialClass.push(classes.Modal_hidden);
    }

    return (
        <Fragment>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div className={specialClass.join(' ')} >
                {props.children}
            </div>
        </Fragment>
    );
};

export default modal;