import * as types from '../constants/product';

export const getProduct = (id) => {
    return {
        type: types.GET_PRODUCT,
        payload : {
            id
        }
    }
}

export const getProductSuccess = (data) => {
    return {
        type : types.GET_PRODUCT_SUCCESS,
        payload : {
            data
        }
    }
}

