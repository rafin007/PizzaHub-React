import React, { Component, Fragment } from 'react';

import Pizza from '../../Components/Pizza/Pizza';
import BuildControls from '../../Components/Pizza/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Pizza/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';

import axios from '../../axios-orders';

const INGREDIENTS_PRICE = {
    tomatoes: 50,
    vegies: 70,
    corns: 40,
    mushrooms: 120,
    onions: 150
};

class PizzaBuilder extends Component {

    state = {
        ingredients: {
            tomatoes: false,
            vegies: false,
            corns: false,
            mushrooms: false,
            onions: false
        },
        totalPrice: 400,
        purchasable: false,
        ordered: false,
        loading: false
    };

    checkPurchasableHandler = (ingredients) => {
        const allValue = Object.values(ingredients);
        const isPurchasable = allValue.map(value => value ? 1 : 0).reduce((sum, el) => { return sum + el }, 0);

        this.setState({ purchasable: isPurchasable > 0 });
    }

    isOrderedHandler = () => {
        this.setState({ ordered: true });
    }

    orderCanceledHandler = () => {
        this.setState({ ordered: false });
    }

    orderContinuedHandler = () => {
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                street: 'Mullholand Drive 321st',
                country: 'United States',
                zipCode: '2313'
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json', order).then(response => this.setState({ loading: false, ordered: false })).catch(error => this.setState({ loading: false, ordered: false }));
    }

    ingredientsChangedHandler = (event, type) => {
        const ingredients = { ...this.state.ingredients };
        let totalPrice = this.state.totalPrice;

        if (event.target.checked) {
            ingredients[type] = true;
            totalPrice += INGREDIENTS_PRICE[type];
        }
        else {
            ingredients[type] = false;
            totalPrice -= INGREDIENTS_PRICE[type];
        }

        this.checkPurchasableHandler(ingredients);

        this.setState({ ingredients, totalPrice });
        // console.log(this.state.totalPrice);
    }

    render() {

        let orderSummary = (
            <OrderSummary ingredients={this.state.ingredients} pricing={INGREDIENTS_PRICE} cancelled={this.orderCanceledHandler} advanced={this.orderContinuedHandler} price={this.state.totalPrice} />
        );

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Fragment>
                <Modal show={this.state.ordered} modalClosed={this.orderCanceledHandler} >
                    {orderSummary}
                </Modal>
                <Pizza ingredients={this.state.ingredients} />
                <BuildControls checkIngredients={this.ingredientsChangedHandler} price={this.state.totalPrice} isDisabled={this.state.purchasable} ordered={this.isOrderedHandler} />
            </Fragment>
        );
    }
}

export default PizzaBuilder;