import React from 'react';
import classes from './Input.scss';

const input = (props) => {

    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.touched) {
        inputClasses.push(classes.invalid);
    }
    else if (!props.invalid && props.touched) {
        inputClasses.push(classes.valid);
    }

    switch (props.elementType) {
        case 'input':
            inputElement = (
                <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />
            );
            break;

        case 'textArea':
            inputElement = (
                <input className={inputClasses.join(' ')} type="textarea" {...props.elementConfig} value={props.value} onChange={props.changed} />
            );
            break;

        case 'select':
            inputElement = (
                <select className={inputClasses.join(' ')} value={props.method.value} onChange={props.changed} >
                    {props.method.options.map(option => (
                        <option key={option.value} value={option.value} disabled={option.disabled} hidden={option.hidden} >
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;

        default:
            inputElement = (
                <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />
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