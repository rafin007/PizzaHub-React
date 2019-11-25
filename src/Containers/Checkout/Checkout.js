import React, { Component } from 'react';
import CheckoutSummary from '../../Components/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {
            tomatoes: false,
            vegies: false,
            corns: false,
            mushrooms: false,
            onions: false
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            ingredients[param[0]] = JSON.parse(param[1].toLowerCase());
        }
        this.setState({ ingredients: ingredients });
        // console.log(ingredients);
    }

    orderCancelledHandler = () => {
        this.props.history.goBack();
    }

    orderContinuedHandler = () => {
        // console.log(this.props);
        this.props.history.push(this.props.match.path + '/contact-data');
    }

    render() {

        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} orderCancelled={this.orderCancelledHandler} orderContinued={this.orderContinuedHandler} />
            </div>
        );
    }
}

export default Checkout;