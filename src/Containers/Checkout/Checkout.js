import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../Components/CheckoutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {
            tomatoes: false,
            vegies: false,
            corns: false,
            mushrooms: false,
            onions: false
        },
        totalPrice: 0
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = +param[1];
            }
            else {
                ingredients[param[0]] = JSON.parse(param[1].toLowerCase());
            }
        }
        this.setState({ ingredients: ingredients, totalPrice: price });
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
                <Route path={this.props.match.path + '/contact-data'} render={(props) => <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />} />
            </div>
        );
    }
}

export default Checkout;