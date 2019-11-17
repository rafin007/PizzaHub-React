import React from 'react';
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
            {items.map(item => <BuildControl label={item.label} key={item.label} type={item.type} checkIng={props.checkIngredients} />)}
        </div>
        <button className={classes.OrderButton} disabled={!props.isDisabled} onClick={props.ordered} >ORDER NOW</button>
    </div>
);

export default buildControls;