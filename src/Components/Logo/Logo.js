import React from 'react';
import pizzaLogo from '../../assets/images/logo.png';

import classes from './Logo.scss';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={pizzaLogo} alt="Pizza Hub" className={classes.Logo__img} />
    </div>
);

export default logo;