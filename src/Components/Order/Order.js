import React from 'react';
import classes from './Order.scss';

const order = (props) => {

    const finalIngredients = [];

    for (let ingredient in props.ingredients) {
        if (props.ingredients[ingredient]) {
            finalIngredients.push({
                name: ingredient,
                value: props.ingredients[ingredient]
            });
        }
    }

    const outputIngredients = finalIngredients.map(ingredient => {
        return <span className={classes.Order__span} key={ingredient.name}> {ingredient.name}</span>
    });

    return (
        <div className={classes.Order} >
            <p>Ingredients: {outputIngredients}</p>
            <p>Total Price: <strong>{props.price} BDT</strong> </p>
        </div>
    );
}

export default order;