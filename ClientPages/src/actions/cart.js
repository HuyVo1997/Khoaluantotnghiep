import * as types from '../constants/cart';

export const onChangeQuantity = (cartID, quantity, jwt) => {
    return {
        type: types.CHANGE_QUANTITY,
        payload: {
            cartID,
            quantity,
            jwt
        }
    }
}

export const changeQuantitySuccess = (cartID, quantity, jwt) => {
    return {
        type: types.CHANGE_QUANTITY_SUCCESS,
        payload: {
            cartID,
            quantity,
            jwt
        }
    }
}

export const onDeleteItemFromCart = (cartID, jwt) => {
    return {
        type: types.DELETE_ITEM_FROM_CART,
        payload: {
            cartID,
            jwt
        }
    }
}

export const onDeleteItemFromCartSuccess = (id, jwt) => {
    return {
        type: types.DELETE_ITEM_FROM_CART_SUCCESS,
        payload: {
            id,
            jwt
        }
    }
}

export const onGetProductFromCart = (user, jwt) => {
    return {
        type: types.GET_PRODUCT_FROM_CART,
        payload: {
            user,
            jwt
        }
    }
}

export const onGetProductFromCartSuccess = (data) => {
    return {
        type: types.GET_PRODUCT_FROM_CART_SUCCESS,
        payload: {
            data
        }
    }
}
