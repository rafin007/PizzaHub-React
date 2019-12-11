import React from 'react';
import { connect } from 'react-redux';
import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.scss';

const items = [
    { label: 'Tomatoes', type: 'tomatoes' },
    { label: 'Vegies', type: 'vegies' },
    { label: 'Corns', type: 'corns' },
    { label: 'Mushrooms', type: 'mushrooms' },
    { label: 'Onions', type: 'onions' }
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p className={classes.BuildControls__price}>Current Price: <strong>{props.price} TK</strong></p>
        <div className={classes.BuildControls__ingredients}>
            {items.map(item => <BuildControl label={item.label} key={item.label} type={item.type} checkIng={props.checkIngredients} isChecked={props.ings[item.type]} />)}
        </div>
        <button className={classes.OrderButton} disabled={!props.isDisabled} onClick={props.ordered} >{props.auth ? 'ORDER NOW' : 'SIGN IN TO ORDER'}</button>
    </div>
);

const mapStateToProps = state => {
    return {
        ings: state.pizzaBuilder.ingredients,
        auth: state.auth.idToken
    };
}

export default connect(mapStateToProps)(buildControls);