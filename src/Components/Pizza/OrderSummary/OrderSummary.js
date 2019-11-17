import React from 'react';
import classes from './OrderSummary.scss';

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

    const ingredientSummary = Object.entries(filtered).map(entry => <li key={entry[0]}><span style={{ textTransform: 'capitalize' }}>{entry[0]}</span>: {entry[1]}</li>);

    return (
        <div className={classes.OrderSummary}>
            <h3>Your Order</h3>
            <p>A delicious pizza with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to checkout?</p>
        </div>
    );
}

export default orderSummary;