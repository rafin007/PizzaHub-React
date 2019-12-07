import React from 'react';
import classes from './Order.scss';
import Button from '../UI/Button/Button';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/index';

const Order = (props) => {

    const finalIngredients = [];

    for (let ingredient in props.ingredients) {
        if (props.ingredients[ingredient]) {
            finalIngredients.push({
                name: ingredient,
                value: props.ingredients[ingredient]
            });
        }
    }

    // useEffect(() => {
    //     console.log(props);
    // });

    const outputIngredients = finalIngredients.map(ingredient => {
        return <span className={classes.Order__span} key={ingredient.name}> {ingredient.name}</span>
    });

    return (
        <div className={classes.Order} >
            <p>Ingredients: {outputIngredients}</p>
            <p>Total Price: <strong>{props.price} BDT</strong> </p>
            <Button clicked={() => props.onDeleteOrder(props.id)} btnType="Danger" >DELETE ORDER</Button>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onDeleteOrder: (id) => dispatch(actionTypes.deleteOrder(id))
    }
}

export default connect(null, mapDispatchToProps)(Order);