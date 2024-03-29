import React from 'react';
import classes from './Button.scss';

const Button = (props) => (
    <button className={[classes.Button, classes[props.btnType]].join(' ')} onClick={props.clicked} disabled={props.disabled} >{props.children}</button>
);

export default Button;