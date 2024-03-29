import React from 'react';
import classes from './BuildControl.scss';
import logo from '../../../../assets/SVG/check.svg'

const buildControl = (props) => {

    return (
        <div className={classes.BuildControl} >
            <input className={classes.BuildControl__checkbox} type="checkbox" id={props.type} onChange={(event) => props.checkIng(event, props.type)} checked={props.isChecked} />

            <label htmlFor={props.type} className={classes.BuildControl__label} >
                <span className={classes.BuildControl__button}>
                    <img src={logo} className={classes.BuildControl__icon} alt="Tick logo"></img>
                </span>
                <span className={classes.BuildControl__item}>{props.label}</span>
            </label>
        </div>

    )
};

export default buildControl;