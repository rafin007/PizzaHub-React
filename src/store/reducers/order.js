import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    ordered: false,
    error: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PIZZA_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                ordered: true,
                orders: state.orders.concat(action.orderData)
            };

        case actionTypes.PIZZA_ORDER_FAIL:
            return {
                ...state,
                loading: false
            };

        case actionTypes.PIZZA_ORDER_START:
            return {
                ...state,
                loading: true
            }

        case actionTypes.PIZZA_ORDERED_MODAL_CLOSED:
            return {
                ...state,
                ordered: false
            }

        case actionTypes.FETCH_ORDERS_INIT:
            return {
                ...state,
                loading: true
            }

        case actionTypes.FETCH_ORDERS:
            return {
                ...state,
                orders: action.orders,
                loading: false
            }

        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            }

        case actionTypes.DELETE_ORDER_SUCCESS:
            const updatedState = { ...state };
            const updatedOrders = updatedState.orders.filter(el => el.id !== action.id);
            return {
                ...updatedState,
                orders: updatedOrders
            }

        case actionTypes.DELETE_ORDER_FAIL:
            return {
                ...state,
                error: action.error
            }

        default:
            return state;
    }
}

export default reducer;