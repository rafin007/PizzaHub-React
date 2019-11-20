import React from 'react';
import classes from './OrderSummary.scss';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const finalIngredients = [];

    Object.entries(props.ingredients).forEach(objArr => {
        if (objArr[1]) {
            finalIngredients.push(objArr[0]);
        }
    });

    const filtered = Object.keys(props.pricing)
        .filter(key => finalIngredients.includes(key))
        .reduce((obj, key) => {
            obj[key] = props.pricing[key];
            return obj;
        }, {});

    const ingredientSummary = Object.entries(filtered).map(entry => <li key={entry[0]}><span style={{ textTransform: 'capitalize' }}>{entry[0]}</span>: {entry[1]}TK</li>);

    return (
        <div className={classes.OrderSummary}>
            <h3>Your Order</h3>
            <p>A delicious pizza with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price}TK</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.cancelled} >CANCEL</Button>
            <Button btnType="Success" clicked={props.advanced} >CONTINUE</Button>
        </div>
    );
}

export default orderSummary;