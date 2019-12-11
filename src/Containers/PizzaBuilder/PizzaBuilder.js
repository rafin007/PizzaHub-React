import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/index';

import Pizza from '../../Components/Pizza/Pizza';
import BuildControls from '../../Components/Pizza/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import Button from '../../Components/UI/Button/Button';
import OrderSummary from '../../Components/Pizza/OrderSummary/OrderSummary';
import ErrorHandler from '../../HOC/ErrorHandler/ErrorHandler';

import axios from '../../axios-orders';

class PizzaBuilder extends Component {

    state = {
        purchasable: false,
        ordered: false
    };

    isOrderedHandler = () => {
        if (this.props.auth) {
            this.setState({ ordered: true });
        }
        else {
            this.props.history.push('/signup');
        }
    }

    orderCanceledHandler = () => {
        this.setState({ ordered: false });
    }

    orderContinuedHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {

        let orderSummary = (
            <OrderSummary ingredients={this.props.ings} cancelled={this.orderCanceledHandler} advanced={this.orderContinuedHandler} price={this.props.price} />
        );

        let modal = (
            <Modal show={this.state.ordered} modalClosed={this.orderCanceledHandler} >
                {orderSummary}
            </Modal>
        );

        if (this.props.successOrder) {
            modal = (
                <Modal show={this.props.successOrder} modalClosed={this.props.orderDoneModalClose} >
                    <p style={{ fontSize: '2rem', color: '#703B09' }} >Order successful, you may view them in the orders tab!</p>
                    <Button style={{ fontSize: '2rem' }} clicked={this.props.orderDoneModalClose} btnType="Success" >OK!</Button>
                </Modal>
            );
        }

        return (
            <Fragment>
                {modal}
                <Pizza ingredients={this.props.ings} />
                <BuildControls checkIngredients={this.props.onIngredientChanged} price={this.props.price} abcd={this.props.isPurchasable(this.props.ings)} isDisabled={this.props.purchasable} ordered={this.isOrderedHandler} />
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.pizzaBuilder.ingredients,
        price: state.pizzaBuilder.totalPrice,
        purchasable: state.pizzaBuilder.purchasable,
        successOrder: state.order.ordered,
        auth: state.auth.idToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientChanged: (event, ingName) => dispatch(actionTypes.changeIngredient(event, ingName)),
        isPurchasable: (ingredients) => dispatch(actionTypes.isPurchasable(ingredients)),
        orderDoneModalClose: () => dispatch(actionTypes.pizzaOrderedModalClosed())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(PizzaBuilder, axios));