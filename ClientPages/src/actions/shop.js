import * as types from '../constants/shop';

export const getProductsByType = (brand, type) => {
    return {
        type: types.GET_PRODUCTS_BY_TYPE,
        payload: {
            brand,
            type
        }
    }
}

export const getProductsByTypeSuccess = (data) => {
    return {
        type: types.GET_PRODUCT_BY_TYPE_SUCCESS,
        payload: {
            data
        }
    }
}

export const addProductToCart = (product, jwt) => {
    return {
        type: types.ADD_PRODUCT_TO_CART,
        payload: {
            product,
            jwt
        }
    }
}

export const addProductToCartSuccess = (product, jwt) => {
    return {
        type: types.ADD_PRODUCT_TO_CART_SUCCESS,
        payload: {
            product,
            quantity: 1,
            jwt
        }
    }
}