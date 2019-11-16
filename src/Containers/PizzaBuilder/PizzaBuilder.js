import React, { Component, Fragment } from 'react';

import Pizza from '../../Components/Pizza/Pizza';
import BuildControls from '../../Components/Pizza/BuildControls/BuildControls';

class PizzaBuilder extends Component {

    state = {
        ingredients: {
            tomatoes: false,
            vegies: false,
            corns: false,
            mushrooms: false,
            onions: false
        }
    };

    render() {
        return (
            <Fragment>
                <Pizza ingredients={this.state.ingredients} />
                <BuildControls />
            </Fragment>
        );
    }
}

export default PizzaBuilder;