import * as types from '../constants/order';

export const createOrder = (order, jwt) => {
    return {
        type: types.CREATE_ORDER,
        payload: {
            order,
            jwt
        }
    }
}

export const getOrderByUser = (user, jwt) => {
    return {
        type: types.GET_ORDERID,
        payload: {
            user,
            jwt
        }
    }
}

export const getOrderByUserSuccess = (data) => {
    return {
        type: types.GET_ORDERID_SUCCESS,
        payload: {
            data
        }
    }
}