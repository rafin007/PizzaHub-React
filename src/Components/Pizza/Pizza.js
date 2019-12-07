import React from 'react';
import classes from './Pizza.scss';

import PizzaIngredients from './PizzaIngredients/PizzaIngredients';

const pizza = (props) => {

    const pizzaIngredients = [];

    if (props.ingredients.tomatoes)
        pizzaIngredients.push('tomatoes');

    if (props.ingredients.vegies)
        pizzaIngredients.push('vegies');

    if (props.ingredients.corns)
        pizzaIngredients.push('corns');

    if (props.ingredients.mushrooms)
        pizzaIngredients.push('mushrooms');

    if (props.ingredients.onions)
        pizzaIngredients.push('onions');


    return (
        <div className={classes.Pizza}>

            <PizzaIngredients type="base" />
            {pizzaIngredients.length > 0 ? pizzaIngredients.map(ingredient => <PizzaIngredients type={ingredient} key={ingredient} />) : <p className={classes.paraIng}>Add ingredients below...</p>}

        </div>
    );
}

export default pizza;