import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: {
        tomatoes: false,
        vegies: false,
        corns: false,
        mushrooms: false,
        onions: false
    },
    totalPrice: 400,
    INGREDIENTS_PRICE: {
        tomatoes: 50,
        vegies: 70,
        corns: 40,
        mushrooms: 120,
        onions: 150
    },
    purchasable: false
}

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.INGREDIENT_CHANGED:
            let changed = false;
            action.event.target.checked ? changed = true : changed = false;
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: changed
                },
                totalPrice: changed ? state.totalPrice + state.INGREDIENTS_PRICE[action.ingredientName] : state.totalPrice - state.INGREDIENTS_PRICE[action.ingredientName]
            };

        case actionTypes.IS_PURCHASABLE:
            const allValue = Object.values(action.ingredients);
            const isPurchasable = allValue.map(value => value ? 1 : 0).reduce((sum, el) => { return sum + el }, 0);
            return {
                ...state,
                purchasable: isPurchasable > 0
            }

        default:
            return state;
    }
}

export default reducer;