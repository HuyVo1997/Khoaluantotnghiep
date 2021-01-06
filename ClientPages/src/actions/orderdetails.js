import * as types from '../constants/orderdetail';

export const getOrderDetails = (orderID, jwt) => {
    return {
        type: types.GET_ORDER_DETAILS,
        payload: {
            orderID,
            jwt
        }
    }
}

export const getOrderDetailsSuccess = (data) => {
    return {
        type: types.GET_ORDER_DETAILS_SUCCESS,
        payload: {
            data
        }
    }
}

export const getAllDetails = () => {
    return {
        type : types.GET_ALL_DETAILS
    }
}

export const GetAllDetailsSuccess = (data) => {
    return {
        type : types.GET_ALL_DETAILS_SUCCESS,
        payload : {
            data
        }
    }
}