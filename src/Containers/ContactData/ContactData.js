import React, { Component } from 'react';
import classes from './ContactData.scss';
import Button from '../../Components/UI/Button/Button';
import axios from '../../axios-orders';
import Spinner from '../../Components/UI/Spinner/Spinner';
import ErrorHandler from '../../HOC/ErrorHandler/ErrorHandler';
import Input from '../../Components/UI/Input/Input';

class ContactData extends Component {

    state = {
        name: {
            ...this.inputConfig('input', 'text', 'Your name')
        },
        email: {
            ...this.inputConfig('input', 'email', 'Your Email')
        },
        street: {
            ...this.inputConfig('input', 'text', 'Street')
        },
        postal: {
            ...this.inputConfig('input', 'text', 'Postal Code')
        },
        deliverMethod: {
            options: [
                { value: 'fastest', displayValue: 'Fastest' },
                { value: 'cheapest', displayValue: 'Cheapest' },
            ]
        }
    }

    inputConfig(elType, type, placeholder) {
        return {
            elementType: elType,
            elementConfig: {
                type,
                placeholder
            },
            value: ''
        }
    }

    componentDidMount() {
        console.log(this.props);
    }

    orderConfirmedHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients
        };

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => this.setState({ loading: false }));
    }

    render() {

        let form = (
            <form className={classes.ContactData__form} >

                <Input elementType="..." elementConfig="..." value="..." name="name" />
                <Input elementType="..." elementConfig="..." value="..." name="email" />
                <Input elementType="..." elementConfig="..." value="..." name="street" />
                <Input elementType="..." elementConfig="..." value="..." name="postal" />

                <Button btnType="Success" clicked={(event) => this.orderConfirmedHandler(event)} >ORDER!</Button>

            </form>
        );

        if (this.state.loading) {
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

export default ErrorHandler(ContactData, axios);