import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import Pizza from '../../Components/Pizza/Pizza';
import BuildControls from '../../Components/Pizza/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Pizza/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import ErrorHandler from '../../HOC/ErrorHandler/ErrorHandler';

import axios from '../../axios-orders';

class PizzaBuilder extends Component {

    state = {
        purchasable: false,
        ordered: false,
        loading: false
    };

    isOrderedHandler = () => {
        this.setState({ ordered: true });
    }

    orderCanceledHandler = () => {
        this.setState({ ordered: false });
    }

    orderContinuedHandler = () => {
        const queryParams = [];
        for (let ing in this.state.ingredients) {
            queryParams.push(encodeURIComponent(ing) + '=' + encodeURIComponent(this.state.ingredients[ing]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: `?${queryString}`
        });

    }

    render() {

        let orderSummary = (
            <OrderSummary ingredients={this.props.ings} cancelled={this.orderCanceledHandler} advanced={this.orderContinuedHandler} price={this.props.price} />
        );

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Fragment>
                <Modal show={this.state.ordered} modalClosed={this.orderCanceledHandler} >
                    {orderSummary}
                </Modal>
                <Pizza ingredients={this.props.ings} />
                <BuildControls checkIngredients={this.props.onIngredientChanged} price={this.props.price} abcd={this.props.isPurchasable(this.props.ings)} isDisabled={this.props.purchasable} ordered={this.isOrderedHandler} />
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        purchasable: state.purchasable
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientChanged: (event, ingName) => dispatch({ type: actionTypes.INGREDIENT_CHANGED, event, ingredientName: ingName }),
        isPurchasable: (ingredients) => dispatch({ type: actionTypes.IS_PURCHASABLE, ingredients })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(PizzaBuilder, axios));