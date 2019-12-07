import React from 'react';
import Pizza from '../Pizza/Pizza';
import Button from '../UI/Button/Button';

import classes from './CheckoutSummary.scss';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h2>We hope it tastes well</h2>
            <div className={classes.CheckoutSummary__pizza}>
                <Pizza ingredients={props.ingredients} />
            </div>
            <Button btnType="Danger" clicked={props.orderCancelled} >CANCEL</Button>
            <Button btnType="Success" clicked={props.orderContinued} >CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary;