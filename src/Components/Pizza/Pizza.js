import React from 'react';
import classes from './Pizza.scss';

import PizzaIngredients from './PizzaIngredients/PizzaIngredients';

const pizza = (props) => {
    return (
        <div className={classes.Pizza}>
            <PizzaIngredients type="base" />
            <PizzaIngredients type="tomatoes" />
            <PizzaIngredients type="vegies" />
            <PizzaIngredients type="corns" />
            <PizzaIngredients type="mushrooms" />
            <PizzaIngredients type="onions" />
        </div>
    );
}

export default pizza;