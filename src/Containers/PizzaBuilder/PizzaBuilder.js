import React, { Component, Fragment } from 'react';

import Pizza from '../../Components/Pizza/Pizza';

class PizzaBuilder extends Component {
    render() {
        return (
            <Fragment>
                <Pizza />
                <div>Build Controls</div>
            </Fragment>
        );
    }
}

export default PizzaBuilder;