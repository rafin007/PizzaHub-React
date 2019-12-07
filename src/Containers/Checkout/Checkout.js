import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../Components/CheckoutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData';

class Checkout extends Component {

    orderCancelledHandler = () => {
        this.props.history.goBack();
    }

    orderContinuedHandler = () => {
        // console.log(this.props);
        this.props.history.push(this.props.match.path + '/contact-data');
    }

    render() {

        let summary = <Redirect to="/" />;
        if (this.props.purchasable) {
            summary = (
                <div>
                    <CheckoutSummary ingredients={this.props.ingredients} orderCancelled={this.orderCancelledHandler} orderContinued={this.orderContinuedHandler} />
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
                </div>
            );
        }

        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.pizzaBuilder.ingredients,
        purchasable: state.pizzaBuilder.purchasable
    }
};

export default connect(mapStateToProps)(Checkout);