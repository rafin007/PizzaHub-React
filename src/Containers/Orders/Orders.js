import React, { Component } from 'react';
import axios from '../../axios-orders';
import Order from '../../Components/Order/Order';
import Spinner from '../../Components/UI/Spinner/Spinner';
import ErrorHandler from '../../HOC/ErrorHandler/ErrorHandler';

import classes from './Orders.scss';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json').then(response => {
            const fetchedOrders = [];
            for (let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                });
            }
            this.setState({ orders: fetchedOrders, loading: false });
        }).catch(error => {
            console.log(error);
            this.setState({ loading: false });
        });
    }

    render() {

        let orders = <Spinner />;

        if (!this.state.loading) {
            if (this.state.orders.length > 0) {
                orders = this.state.orders.map(order => <Order key={order.id} ingredients={order.ingredients} price={order.price} />);
            }
            else {
                orders = <p style={{ fontSize: '2rem' }} >You currently do not have any orders in place...</p>
            }
        }

        return (
            <div className={classes.Orders}>
                <h3>Your orders so far...</h3>
                {orders}
            </div>
        );
    }
}

export default ErrorHandler(Orders, axios);