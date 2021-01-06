import * as types from '../constants/orderdetails';

export const getOrderDetails = (orderID) => {
    return {
        type : types.GET_ORDER_DETAILS,
        payload : {
            orderID
        }
    }
}

export const getOrderDetailsSuccess = (data) => {
    return {
        type : types.GET_ORDER_DETAILS_SUCCESS,
        payload : {
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