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
        <h2 className={classes.BuildControls__header}>Start adding all the good stuff...</h2>
        {items.map(item => <BuildControl label={item.label} key={item.label} type={item.type} />)}
    </div>
);

export default buildControls;