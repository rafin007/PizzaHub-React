import React, { Component } from 'react';
import classes from './ContactData.scss';
import Button from '../../Components/UI/Button/Button';
import axios from '../../axios-orders';
import Spinner from '../../Components/UI/Spinner/Spinner';
import ErrorHandler from '../../HOC/ErrorHandler/ErrorHandler';
import Input from '../../Components/UI/Input/Input';
import Modal from '../../Components/UI/Modal/Modal';

import { checkValidity } from '../Validation/Validation';

import * as actionTypes from '../../store/actions/index';

import { connect } from 'react-redux';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                ...this.inputConfig('input', 'text', 'Your name')
            },
            street: {
                ...this.inputConfig('input', 'text', 'Street')
            },
            postal: {
                ...this.inputConfig('input', 'text', 'Zip Code')
            },
            // deliverMethod: {
            //     ...this.inputConfig('select', 'text', 'Delivery Method'),
            //     options: [
            //         { value: '', displayValue: 'Delivery Method', disabled: true, hidden: true, selected: true },
            //         { value: 'fastest', displayValue: 'Fastest' },
            //         { value: 'cheapest', displayValue: 'Cheapest' },
            //     ]
            // }
        },
        formIsValid: false,
        showModal: false
    }

    inputConfig(elType, type, placeholder) {
        return {
            elementType: elType,
            elementConfig: {
                type,
                placeholder
            },
            value: '',
            rules: {
                required: true,
                isNumeric: placeholder === 'Zip Code' ? true : false
            },
            valid: false,
            touched: false
        }
    }

    inputChangedHandler = (event, inputId) => {
        const updatedForm = { ...this.state.orderForm };
        const updatedFormElement = { ...updatedForm[inputId] };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.rules);
        updatedFormElement.touched = true;

        let formIsValid = true;
        for (let inputId in updatedForm) {
            formIsValid = updatedForm[inputId].valid && formIsValid;
        }
        updatedForm[inputId] = updatedFormElement;

        this.setState({ orderForm: updatedForm, formIsValid });
    }

    orderConfirmedHandler = (event) => {
        event.preventDefault();

        if (!this.props.isAuth) {
            this.setState({ showModal: true });
            return;
        }

        const orderDetails = {};
        for (let inputId in this.state.orderForm) {
            orderDetails[inputId] = this.state.orderForm[inputId].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderDetails,
            userId: this.props.userId
        };

        this.props.onOrder(order, this.props.history);
    }

    modalClosedHandler = () => {
        this.setState({ showModal: false });
    }


    render() {

        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderConfirmedHandler} >

                <Modal show={this.state.showModal} modalClosed={this.modalClosedHandler} >
                    <p style={{ fontSize: '2rem', color: 'red' }} >Please login to place an order!</p>
                </Modal>

                {formElementsArray.map(element => (
                    <Input key={element.id} elementType={element.config.elementType} elementConfig={element.config.elementConfig} method={this.state.orderForm.deliverMethod} changed={(event) => this.inputChangedHandler(event, element.id)} invalid={!element.config.valid} touched={element.config.touched} />
                ))}

                <Button btnType="Success" disabled={!this.state.formIsValid} >ORDER!</Button>

            </form>
        );

        if (this.props.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h3>Please fill out your contact details..</h3>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.pizzaBuilder.ingredients,
        price: state.pizzaBuilder.totalPrice,
        loading: state.order.loading,
        isAuth: state.auth.idToken,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrder: (orderData, history) => dispatch(actionTypes.pizzaOrder(orderData, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(ContactData, axios));