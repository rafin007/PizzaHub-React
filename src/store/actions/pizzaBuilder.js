import * as actionTypes from './actionTypes';

export const changeIngredient = (event, ingName) => {
    return {
        type: actionTypes.INGREDIENT_CHANGED,
        event,
        ingredientName: ingName
    }
}

export const isPurchasable = (ingredients) => {
    return {
        type: actionTypes.IS_PURCHASABLE,
        ingredients
    }
}