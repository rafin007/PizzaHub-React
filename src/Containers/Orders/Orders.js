import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';

import axios from '../../axios-orders';
import Order from '../../Components/Order/Order';
import Spinner from '../../Components/UI/Spinner/Spinner';
import ErrorHandler from '../../HOC/ErrorHandler/ErrorHandler';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/index';

import classes from './Orders.scss';

class Orders extends Component {

    componentDidMount() {

        // if (!this.props.isAuth) {
        //     return (
        //         <Redirect to="/" />
        //     );
        // }

        this.props.fetchOrdersAsync();
    }

    render() {

        let orders = <Spinner />;

        if (!this.props.loading) {
            if (this.props.orders.length > 0) {
                orders = this.props.orders.map(order => <Order id={order.id} key={order.id} ingredients={order.ingredients} price={order.price} />);
            }
            else {
                orders = <p style={{ fontSize: '2rem' }} >You currently do not have any orders in place...</p>;
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

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        isAuth: state.auth.idToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrdersAsync: () => dispatch(actionTypes.fetchOrdersAsync())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(Orders, axios));