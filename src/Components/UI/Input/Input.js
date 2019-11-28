import React from 'react';
import classes from './Input.scss';

const input = (props) => {

    let inputElement = null;

    switch (props.elementType) {
        case 'input':
            inputElement = (
                <input className={classes.InputElement} type="text" {...props.elementConfig} value={props.value} />
            );
            break;

        case 'textArea':
            inputElement = (
                <input className={classes.InputElement} type="textarea" {...props.elementConfig} value={props.value} />
            );
            break;

        default:
            inputElement = (
                <input className={classes.InputElement} type="text" {...props.elementConfig} value={props.value} />
            );
    }

    return (
        <div className={classes.Input}>
            <label className={classes.label} >{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;