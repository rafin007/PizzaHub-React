import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const pizzaOrderSuccess = (orderData) => {
    return {
        type: actionTypes.PIZZA_ORDER_SUCCESS,
        orderData
    };
};

export const pizzaOrderFail = (error) => {
    return {
        type: actionTypes.PIZZA_ORDER_FAIL,
        error
    };
};

export const pizzaOrderStart = () => {
    return {
        type: actionTypes.PIZZA_ORDER_START
    }
}

export const pizzaOrder = (orderData, history) => {
    return dispatch => {
        dispatch(pizzaOrderStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                history.push('/');
                dispatch(pizzaOrderSuccess(response.data));
            })
            .catch(error => dispatch(pizzaOrderFail(error)));
    };
};

export const pizzaOrderedModalClosed = () => {
    return {
        type: actionTypes.PIZZA_ORDERED_MODAL_CLOSED
    };
};

export const fetchOrdersInit = () => {
    return {
        type: actionTypes.FETCH_ORDERS_INIT
    }
}

export const fetchOrders = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS,
        orders
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error
    }
}

export const fetchOrdersAsync = () => {
    return dispatch => {
        dispatch(fetchOrdersInit());
        axios.get('/orders.json').then(response => {
            const fetchedOrders = [];
            for (let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                });
            }
            dispatch(fetchOrders(fetchedOrders));
        }).catch(error => {
            dispatch(fetchOrdersFail(error));
        });
    };
};

// export const deleteOrderStart = () => {
//     return {
//         type: actionTypes.DELETE_ORDER_START
//     }
// }

export const deleteOrderSuccess = (id) => {
    return {
        type: actionTypes.DELETE_ORDER_SUCCESS,
        id
    }
}

export const deleteOrderFail = (error) => {
    return {
        type: actionTypes.DELETE_ORDER_FAIL,
        error
    }
}

export const deleteOrder = (id) => {
    return dispatch => {
        axios.delete(`/orders/${id}.json`).then(response => {
            dispatch(deleteOrderSuccess(id));
        }).catch(error => {
            dispatch(deleteOrderFail(error));
        });
    };
};